import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  X,
  FileText,
  Sun,
  Moon,
  AlertTriangle,
  Layers,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  ArrowRight,
  Globe
} from 'lucide-react';
import { Mgalogo } from './Mgalogo';
import { useTranslation } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { KEYNOTE_UI, getKeynoteSlides } from '../i18n/keynoteTranslations';
import { ProductItem, InspectionScheduleConfig, InspectionRunLog, SlideData } from '../types/qa';

interface KeynotePresentationProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  schedule: InspectionScheduleConfig;
  logs: InspectionRunLog[];
  threshold: number;
}

export const KeynotePresentation: React.FC<KeynotePresentationProps> = ({
  isOpen,
  onClose,
  products,
  schedule,
  logs,
  threshold
}) => {
  const { language, setLanguage } = useTranslation();
  const ui = KEYNOTE_UI[language] || KEYNOTE_UI['zh-CN'];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [showSlideIndex, setShowSlideIndex] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Core alert statistics for authentic display
  const alertCount = products.filter((p) => p.rating < threshold).length;
  const criticalSafetyCount = logs[0]?.criticalSafetyCount ?? 1;

  // Slide definitions: Laser-focused on 1 core message per slide with 3 progressive beats
  const slides: SlideData[] = useMemo(() => {
    return getKeynoteSlides(language, {
      threshold,
      alertCount,
      criticalSafetyCount,
      intervalHours: schedule.intervalMinutes / 60,
      logsCount: logs.length
    });
  }, [language, threshold, alertCount, criticalSafetyCount, schedule.intervalMinutes, logs.length]);

  const currentSlideData = slides[currentSlide] || slides[0];

  // Advance step or slide
  const handleNext = useCallback(() => {
    if (currentStep < currentSlideData.steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide((prev) => prev + 1);
        setCurrentStep(0);
      } else {
        // Reached end: loop or pause
        if (isAutoplay) {
          setCurrentSlide(0);
          setCurrentStep(0);
        }
      }
    }
  }, [currentStep, currentSlide, currentSlideData.steps.length, slides.length, isAutoplay]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      if (currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
        setCurrentStep(slides[currentSlide - 1].steps.length - 1);
      }
    }
  }, [currentStep, currentSlide, slides]);

  // Jump to specific slide
  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setCurrentStep(0);
    setShowSlideIndex(false);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentSlide < slides.length - 1) {
          setCurrentSlide((prev) => prev + 1);
          setCurrentStep(0);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentSlide > 0) {
          setCurrentSlide((prev) => prev - 1);
          setCurrentStep(0);
        }
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'n' || e.key === 'N') {
        setShowSpeakerNotes((prev) => !prev);
      } else if (e.key === 't' || e.key === 'T') {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, currentSlide, slides.length, onClose]);

  // Autoplay timer: auto advances every 4.5s
  useEffect(() => {
    if (!isAutoplay || !isOpen) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoplay, isOpen, handleNext]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  if (!isOpen) return null;

  // Colors based on theme
  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-[#050507] text-[#f5f5f7]' : 'bg-[#fbfbfd] text-[#1d1d1f]';
  const subtleTextClass = isDark ? 'text-zinc-400' : 'text-slate-500';

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col select-none overflow-hidden transition-colors duration-500 font-sans ${bgClass}`}
    >
      {/* ── Top Apple Keynote Minimalist Navigation Bar ── */}
      <header
        className={`h-14 px-6 md:px-10 flex items-center justify-between shrink-0 border-b backdrop-blur-xl ${
          isDark ? 'border-white/10 bg-black/60' : 'border-black/[0.06] bg-white/70'
        }`}
      >
        {/* Left: Department and MGA Official Logo */}
        <div className="flex items-center gap-3">
          <Mgalogo size="sm" />
          <div className="h-4 w-px bg-zinc-700/60" />
          <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400">
            {ui.headerDept}
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-500">
            {ui.headerKeynote}
          </span>
        </div>

        {/* Center: Slide Progress Pill (Clean unboxed style) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSlideIndex(!showSlideIndex)}
            className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
              isDark
                ? 'bg-zinc-900/90 text-zinc-300 hover:text-white border border-white/10'
                : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border border-black/5'
            }`}
            title={ui.viewOverviewTooltip}
          >
            <Layers className="w-3.5 h-3.5 opacity-70" />
            <span>
              {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </button>

          {/* Sub-step indicator pills */}
          <div className="hidden md:flex items-center gap-1 ml-2">
            {currentSlideData.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  i === currentStep
                    ? isDark
                      ? 'w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                      : 'w-6 bg-slate-900'
                    : i < currentStep
                    ? isDark
                      ? 'w-2.5 bg-zinc-600'
                      : 'w-2.5 bg-slate-300'
                    : isDark
                    ? 'w-2 bg-zinc-800'
                    : 'w-2 bg-slate-200'
                }`}
                title={ui.stepTooltip.replace('{n}', String(i + 1))}
              />
            ))}
          </div>
        </div>

        {/* Right: Controls (Language, Theme, Speaker Notes, Autoplay, Fullscreen, Close) */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Button & Dropdown */}
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border transition-colors ${
              isDark
                ? 'bg-zinc-900/90 text-zinc-300 border-white/10 hover:border-white/20'
                : 'bg-zinc-100 text-zinc-800 border-black/5 hover:bg-zinc-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5 opacity-70 text-emerald-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer pr-0.5"
              aria-label={ui.langSwitchAria}
            >
              <option value="zh-CN" className={isDark ? 'bg-zinc-900 text-white' : 'bg-white text-black'}>
                简中
              </option>
              <option value="zh-TW" className={isDark ? 'bg-zinc-900 text-white' : 'bg-white text-black'}>
                繁中
              </option>
              <option value="en-US" className={isDark ? 'bg-zinc-900 text-white' : 'bg-white text-black'}>
                EN
              </option>
            </select>
          </div>

          {/* Autoplay button */}
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isAutoplay
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : isDark
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
            title={isAutoplay ? ui.autoplayPauseTooltip : ui.autoplayStartTooltip}
          >
            {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Speaker notes toggle */}
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              showSpeakerNotes
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : isDark
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
            title={ui.speakerNotesTooltip}
          >
            <FileText className="w-4 h-4" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isDark
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
            title={ui.themeToggleTooltip}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isDark
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
            title={ui.fullscreenTooltip}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close presentation */}
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer ml-1 ${
              isDark
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
            }`}
            title={ui.exitTooltip}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Slide Index Drawer (Top overlay when clicked) ── */}
      {showSlideIndex && (
        <div
          className={`absolute top-14 left-0 right-0 z-30 p-6 backdrop-blur-2xl border-b shadow-2xl transition-all animate-in slide-in-from-top-4 duration-300 ${
            isDark ? 'bg-black/95 border-white/10' : 'bg-white/95 border-black/10'
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
                {ui.slideOverviewTitle}
              </span>
              <button
                onClick={() => setShowSlideIndex(false)}
                className="text-xs text-zinc-400 hover:text-zinc-100 cursor-pointer"
              >
                {ui.collapse}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    idx === currentSlide
                      ? isDark
                        ? 'border-white bg-white/10 shadow-lg'
                        : 'border-slate-900 bg-slate-900 text-white'
                      : isDark
                      ? 'border-white/5 bg-zinc-900/50 hover:bg-zinc-900 hover:border-white/20'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-50 block mb-1">
                    {String(idx + 1).padStart(2, '0')} · {s.id.toUpperCase()}
                  </span>
                  <p className="text-xs font-bold truncate leading-tight">{s.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Main Stage: Apple Keynote Slide Viewport ── */}
      <main className="flex-1 relative flex items-center justify-center p-6 md:p-12 lg:p-16 overflow-y-auto">
        {/* Subtle Apple Ambient Studio Backlight */}
        <div
          className={`absolute pointer-events-none w-[800px] h-[500px] rounded-full blur-[160px] opacity-20 -top-40 -right-40 ${
            isDark ? 'bg-cyan-500/30' : 'bg-blue-200/50'
          }`}
        />
        <div
          className={`absolute pointer-events-none w-[600px] h-[400px] rounded-full blur-[140px] opacity-15 -bottom-20 -left-20 ${
            isDark ? 'bg-pink-500/20' : 'bg-amber-100/50'
          }`}
        />

        {/* Slide Content Container */}
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
          {/* Left Column: Focused Narrative with Extreme Weight Contrast */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            {/* Tag / Stage Kicker */}
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-zinc-400 font-semibold">
                {currentSlideData.tag}
              </span>
            </div>

            {/* Slide Core Statement (Laser-focused, Jobsian Typography) */}
            <h1
              key={`title-${currentSlide}-${language}`}
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.08] transition-all animate-in fade-in slide-in-from-bottom-3 duration-500 ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
            >
              {currentSlideData.title}
            </h1>

            {/* Subtitle / Contextual Narrative */}
            <p
              key={`sub-${currentSlide}-${language}`}
              className={`text-sm sm:text-base leading-relaxed font-normal transition-all animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 ${subtleTextClass}`}
            >
              {currentSlideData.subtitle}
            </p>

            {/* Step-by-Step Progressive Reveal Cards */}
            <div className="pt-2 space-y-3">
              {currentSlideData.steps.map((st, i) => {
                const isRevealed = i <= currentStep;
                const isCurrent = i === currentStep;

                return (
                  <div
                    key={st.badge}
                    onClick={() => setCurrentStep(i)}
                    className={`p-4 rounded-2xl border transition-all duration-500 cursor-pointer relative overflow-hidden ${
                      isRevealed
                        ? isCurrent
                          ? isDark
                            ? 'bg-zinc-900/90 border-white/30 shadow-[0_0_24px_rgba(255,255,255,0.06)]'
                            : 'bg-white border-slate-900 shadow-md ring-1 ring-slate-900/5'
                          : isDark
                          ? 'bg-zinc-950/60 border-white/10 opacity-70 hover:opacity-100'
                          : 'bg-slate-50 border-slate-200/80 opacity-70 hover:opacity-100'
                        : isDark
                        ? 'opacity-20 border-white/5 bg-transparent pointer-events-none'
                        : 'opacity-20 border-slate-200 bg-transparent pointer-events-none'
                    }`}
                  >
                    {/* Active Accent Light Indicator */}
                    {isCurrent && (
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-emerald-500" />
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${
                              isCurrent ? 'text-emerald-400' : 'text-zinc-500'
                            }`}
                          >
                            {st.badge}
                          </span>
                        </div>
                        <h4
                          className={`text-sm font-bold tracking-tight ${
                            isCurrent
                              ? isDark
                                ? 'text-white'
                                : 'text-slate-900'
                              : isDark
                              ? 'text-zinc-300'
                              : 'text-slate-700'
                          }`}
                        >
                          {st.heading}
                        </h4>
                        {isRevealed && (
                          <p
                            className={`text-xs leading-normal transition-opacity duration-300 ${
                              isDark ? 'text-zinc-400' : 'text-slate-600'
                            }`}
                          >
                            {st.detail}
                          </p>
                        )}
                      </div>

                      {/* Stat highlight if present */}
                      {st.metric && isRevealed && (
                        <div className="text-right shrink-0 pt-0.5">
                          <div
                            className={`text-xs font-mono font-bold tracking-tight ${
                              isCurrent ? 'text-emerald-400 font-extrabold' : 'text-zinc-400'
                            }`}
                          >
                            {st.metric.value}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-normal">
                            {st.metric.label}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: High-Definition Real UI Live Mocks */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            {/* Apple Studio Display Bezel Container */}
            <div
              className={`w-full rounded-2xl md:rounded-3xl border transition-all duration-700 overflow-hidden shadow-2xl relative ${
                isDark
                  ? 'border-white/15 bg-[#0d0d11] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]'
                  : 'border-slate-200/90 bg-[#f4f5f8] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)]'
              }`}
            >
              {/* Studio Display Hardware Top Bezel & Window Controls */}
              <div
                className={`h-9 px-4 flex items-center justify-between border-b transition-colors ${
                  isDark ? 'bg-zinc-950/80 border-white/10' : 'bg-white/90 border-slate-200/80 backdrop-blur-md'
                }`}
              >
                {/* macOS Window Controls */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <span className={`ml-2 text-[11px] font-mono truncate max-w-[200px] ${
                    isDark ? 'text-zinc-400' : 'text-slate-500 font-medium'
                  }`}>
                    mga-sentinel.internal / {currentSlideData.id}
                  </span>
                </div>

                {/* Live Real-time Indicator & Magnifier toggle */}
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1.5 text-[10px] font-mono ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600 font-semibold'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'} animate-ping`} />
                    <span>{ui.retinaLiveIndicator}</span>
                  </div>
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className={`transition-colors cursor-pointer ${
                      isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-400 hover:text-slate-800'
                    }`}
                    title={isZoomed ? ui.zoomOutTooltip : ui.zoomInTooltip}
                  >
                    {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Display Canvas with Glass Reflection & Active Slide Mock */}
              <div
                className={`p-4 md:p-6 transition-all duration-500 overflow-hidden ${
                  isZoomed ? 'scale-105 origin-center' : 'scale-100'
                } ${isDark ? 'bg-[#0d0d11]' : 'bg-[#f4f5f8]'}`}
              >
                {/* ── Slide 0: Sentinel Mission Control ── */}
                {currentSlide === 0 && (
                  <div className="space-y-4">
                    {/* Header Banner */}
                    <div className={`flex items-center justify-between p-3.5 rounded-2xl border transition-colors ${
                      isDark
                        ? 'bg-slate-900 text-white border-slate-800'
                        : 'bg-white text-slate-900 border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
                    }`}>
                      <div className="flex items-center gap-3">
                        <Mgalogo size="sm" />
                        <div>
                          <h4 className={`text-xs font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {ui.mock0DeptTitle}
                          </h4>
                          <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock0DeptSub}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 text-[10px] font-mono rounded-full border ${
                          isDark
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold'
                        }`}>
                          {ui.mock0SystemOk}
                        </span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div className={`p-3 rounded-2xl border transition-colors ${
                        isDark
                          ? 'bg-slate-800/40 border-slate-700/50'
                          : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
                      }`}>
                        <span className={`text-[10px] block ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock0SkuLabel}</span>
                        <span className={`text-xl font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{ui.mock0SkuVal}</span>
                        <span className={`text-[9px] block ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>{ui.mock0SkuSub}</span>
                      </div>
                      <div className={`p-3 rounded-2xl border transition-colors ${
                        isDark
                          ? 'bg-slate-800/40 border-slate-700/50'
                          : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
                      }`}>
                        <span className={`text-[10px] block ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock0AvgRatingLabel}</span>
                        <span className={`text-xl font-bold font-mono ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>4.38</span>
                        <span className={`text-[9px] block ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`}>{ui.mock0AvgRatingSub}</span>
                      </div>
                      <div className={`p-3 rounded-2xl border transition-colors ${
                        isDark
                          ? 'bg-rose-950/30 border-rose-800/40'
                          : 'bg-rose-50/80 border-rose-200/80 shadow-[0_1px_3px_rgba(225,29,72,0.04)]'
                      }`}>
                        <span className={`text-[10px] block ${isDark ? 'text-rose-300' : 'text-rose-700 font-medium'}`}>{ui.mock0AlertLabel}</span>
                        <span className={`text-xl font-bold font-mono ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                          {ui.mock0AlertCount.replace('{count}', String(alertCount))}
                        </span>
                        <span className={`text-[9px] block ${isDark ? 'text-rose-300' : 'text-rose-600'}`}>{ui.mock0AlertSub}</span>
                      </div>
                      <div className={`p-3 rounded-2xl border transition-colors ${
                        isDark
                          ? 'bg-amber-950/30 border-amber-800/40'
                          : 'bg-amber-50/80 border-amber-200/80 shadow-[0_1px_3px_rgba(217,119,6,0.04)]'
                      }`}>
                        <span className={`text-[10px] block ${isDark ? 'text-amber-300' : 'text-amber-800 font-medium'}`}>{ui.mock0SafetyLabel}</span>
                        <span className={`text-xl font-bold font-mono ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                          {ui.mock0SafetyCount.replace('{count}', String(criticalSafetyCount))}
                        </span>
                        <span className={`text-[9px] block ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>{ui.mock0SafetySub}</span>
                      </div>
                    </div>

                    {/* Live SKU preview cards */}
                    <div className={`p-3.5 rounded-2xl border space-y-2 transition-colors ${
                      isDark
                        ? 'bg-slate-800/30 border-slate-700/40'
                        : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
                    }`}>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={isDark ? 'text-zinc-400' : 'text-slate-500'}>{ui.mock0LiveStream}</span>
                        <span className={isDark ? 'text-emerald-400' : 'text-emerald-600 font-semibold'}>{ui.mock0Channels}</span>
                      </div>
                      <div className={`divide-y transition-colors ${isDark ? 'divide-zinc-800/60' : 'divide-slate-100'}`}>
                        <div className="flex items-center justify-between text-xs py-2 px-0.5">
                          <span className={`font-semibold truncate ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>
                            Little Tikes Power Cuts Chainsaw 2-in-1
                          </span>
                          <span className={`font-mono font-bold text-[11px] tabular-nums ${
                            isDark ? 'text-rose-400' : 'text-rose-600'
                          }`}>
                            {ui.mock0ChainsawIssue}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs py-2 px-0.5">
                          <span className={`font-semibold truncate ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>
                            L.O.L. Surprise! Magic Flying Pixie
                          </span>
                          <span className={`font-mono font-bold text-[11px] tabular-nums ${
                            isDark ? 'text-amber-400' : 'text-amber-600'
                          }`}>
                            {ui.mock0PixieIssue}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs py-2 px-0.5">
                          <span className={`font-semibold truncate ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>
                            Rainbow High Fashion Dolls Series 5
                          </span>
                          <span className={`font-mono font-bold text-[11px] tabular-nums ${
                            isDark ? 'text-[#2997ff]' : 'text-[#0071e3]'
                          }`}>
                            {ui.mock0RainbowIssue}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Slide 1: Challenge & The Blind Spot ── */}
                {currentSlide === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Traditional Manual Chaos */}
                    <div className={`p-4 rounded-2xl border space-y-3 transition-colors ${
                      isDark
                        ? 'bg-rose-950/20 border-rose-900/40'
                        : 'bg-rose-50/70 border-rose-200/90 shadow-[0_1px_3px_rgba(225,29,72,0.04)]'
                    }`}>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`w-4 h-4 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
                        <span className={`text-xs font-bold ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>{ui.mock1ChaosTitle}</span>
                      </div>
                      <ul className={`space-y-2 text-xs ${isDark ? 'text-zinc-400' : 'text-slate-700'}`}>
                        <li className="flex items-start gap-1.5">
                          <span className={`font-mono font-bold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>✕</span>
                          <span>
                            <strong>{ui.mock1ChaosItem1Title}</strong> {ui.mock1ChaosItem1Desc}
                          </span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className={`font-mono font-bold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>✕</span>
                          <span>
                            <strong>{ui.mock1ChaosItem2Title}</strong> {ui.mock1ChaosItem2Desc}
                          </span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className={`font-mono font-bold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>✕</span>
                          <span>
                            <strong>{ui.mock1ChaosItem3Title}</strong> {ui.mock1ChaosItem3Desc}
                          </span>
                        </li>
                      </ul>
                      <div className={`pt-2 text-center p-2 rounded-xl font-mono text-[11px] ${
                        isDark ? 'bg-rose-900/20 text-rose-300' : 'bg-rose-100/80 text-rose-800 border border-rose-200/60'
                      }`}>
                        {ui.mock1ChaosFooter}
                      </div>
                    </div>

                    {/* Sentinel Solution */}
                    <div className={`p-4 rounded-2xl border space-y-3 transition-colors ${
                      isDark
                        ? 'bg-emerald-950/20 border-emerald-900/40'
                        : 'bg-emerald-50/70 border-emerald-200/90 shadow-[0_1px_3px_rgba(16,185,129,0.04)]'
                    }`}>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <span className={`text-xs font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>{ui.mock1SentinelTitle}</span>
                      </div>
                      <ul className={`space-y-2 text-xs ${isDark ? 'text-zinc-400' : 'text-slate-700'}`}>
                        <li className="flex items-start gap-1.5">
                          <span className={`font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>✓</span>
                          <span>
                            <strong>{ui.mock1SentinelItem1Title}</strong> {ui.mock1SentinelItem1Desc}
                          </span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className={`font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>✓</span>
                          <span>
                            <strong>{ui.mock1SentinelItem2Title}</strong> {ui.mock1SentinelItem2Desc}
                          </span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className={`font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>✓</span>
                          <span>
                            <strong>{ui.mock1SentinelItem3Title}</strong> {ui.mock1SentinelItem3Desc}
                          </span>
                        </li>
                      </ul>
                      <div className={`pt-2 text-center p-2 rounded-xl font-mono text-[11px] ${
                        isDark ? 'bg-emerald-900/20 text-emerald-300' : 'bg-emerald-100/80 text-emerald-800 border border-emerald-200/60'
                      }`}>
                        {ui.mock1SentinelFooter}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Slide 2: Omni-Channel Matrix High-Res UI ── */}
                {currentSlide === 2 && (
                  <div className={`space-y-3 p-3.5 rounded-2xl border transition-colors ${
                    isDark
                      ? 'bg-zinc-900/40 border-zinc-800'
                      : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
                  }`}>
                    <div className={`flex items-center justify-between pb-2 border-b ${
                      isDark ? 'border-zinc-700/50' : 'border-slate-200/80'
                    }`}>
                      <div>
                        <span className={`text-xs font-bold ${isDark ? 'text-zinc-200' : 'text-slate-900'}`}>{ui.mock2MatrixTitle}</span>
                        <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock2MatrixSub}</p>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isDark
                          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                          : 'text-emerald-700 bg-emerald-50 border-emerald-200 font-semibold'
                      }`}>
                        {ui.mock2UpcAligned}
                      </span>
                    </div>

                    {/* Miniature real matrix table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px] text-left">
                        <thead>
                          <tr className={`border-b font-mono text-[10px] ${
                            isDark ? 'border-zinc-800 text-zinc-400' : 'border-slate-200 text-slate-500 bg-slate-50/70'
                          }`}>
                            <th className="py-1.5 px-2 font-semibold">{ui.mock2ThProduct}</th>
                            <th className="py-1.5 px-2 font-semibold">Amazon US</th>
                            <th className="py-1.5 px-2 font-semibold">Walmart US</th>
                            <th className="py-1.5 px-2 font-semibold">Target</th>
                            <th className="py-1.5 px-2 font-semibold">{ui.mock2ThStatus}</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y font-mono ${isDark ? 'divide-zinc-800/60' : 'divide-slate-100'}`}>
                          <tr className={isDark ? 'bg-rose-950/20' : 'bg-rose-50/50'}>
                            <td className={`py-2 px-2 font-sans font-medium ${isDark ? 'text-zinc-200' : 'text-slate-900'}`}>
                              Little Tikes Chainsaw 2-in-1
                            </td>
                            <td className={`py-2 px-2 font-bold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>2.7 (120)</td>
                            <td className={`py-2 px-2 font-bold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>2.9 (84)</td>
                            <td className={`py-2 px-2 ${isDark ? 'text-amber-400' : 'text-amber-700 font-medium'}`}>3.1 (42)</td>
                            <td className={`py-2 px-2 font-sans text-[10px] font-bold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>{ui.mock2StatusAlert}</td>
                          </tr>
                          <tr className={isDark ? 'bg-amber-950/20' : 'bg-amber-50/50'}>
                            <td className={`py-2 px-2 font-sans font-medium ${isDark ? 'text-zinc-200' : 'text-slate-900'}`}>
                              L.O.L. Surprise! Flying Pixie
                            </td>
                            <td className={`py-2 px-2 font-bold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>2.8 (95)</td>
                            <td className={`py-2 px-2 ${isDark ? 'text-amber-400 font-medium' : 'text-amber-700 font-medium'}`}>3.2 (61)</td>
                            <td className={`py-2 px-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>3.6 (38)</td>
                            <td className={`py-2 px-2 font-sans text-[10px] font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>{ui.mock2StatusWatch}</td>
                          </tr>
                          <tr className={isDark ? '' : 'hover:bg-slate-50/80'}>
                            <td className={`py-2 px-2 font-sans font-medium ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>
                              Rainbow High Fashion Dolls
                            </td>
                            <td className={`py-2 px-2 font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>4.8 (320)</td>
                            <td className={`py-2 px-2 font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>4.6 (210)</td>
                            <td className={`py-2 px-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>4.7 (155)</td>
                            <td className={`py-2 px-2 font-sans text-[10px] font-bold ${isDark ? 'text-[#2997ff]' : 'text-[#0071E3]'}`}>{ui.mock2StatusPass}</td>
                          </tr>
                          <tr className={isDark ? '' : 'hover:bg-slate-50/80'}>
                            <td className={`py-2 px-2 font-sans font-medium ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>
                              Bratz 20th Anniversary
                            </td>
                            <td className={`py-2 px-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>4.5 (180)</td>
                            <td className={`py-2 px-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>4.4 (130)</td>
                            <td className={`py-2 px-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>4.5 (92)</td>
                            <td className={`py-2 px-2 font-sans text-[10px] font-bold ${isDark ? 'text-[#2997ff]' : 'text-[#0071E3]'}`}>{ui.mock2StatusPass}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ── Slide 3: 3.0 Threshold Red Line High-Res UI ── */}
                {currentSlide === 3 && (
                  <div className="space-y-4">
                    {/* The Threshold Controller slider representation */}
                    <div className={`p-3.5 rounded-2xl border space-y-2 transition-colors ${
                      isDark
                        ? 'bg-zinc-900/80 border-zinc-700/60'
                        : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
                    }`}>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-bold ${isDark ? 'text-zinc-200' : 'text-slate-900'}`}>{ui.mock3SliderTitle}</span>
                        <span className={`font-mono font-bold px-2 py-0.5 rounded border ${
                          isDark
                            ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                            : 'text-emerald-700 bg-emerald-50 border-emerald-200 font-semibold'
                        }`}>
                          {ui.mock3CurrentBaseline.replace('{threshold}', threshold.toFixed(1))}
                        </span>
                      </div>
                      {/* Realistic slider bar */}
                      <div className="relative flex items-center h-4">
                        <div className={`w-full h-2 rounded-full relative overflow-hidden ${
                          isDark ? 'bg-zinc-700' : 'bg-slate-200'
                        }`}>
                          <div
                            className="h-full bg-rose-500 transition-all duration-300"
                            style={{ width: `${((threshold - 2.0) / 2.5) * 100}%` }}
                          />
                        </div>
                        <div
                          className="absolute w-5 h-5 rounded-full bg-white shadow-lg border-2 border-rose-500 transition-all duration-300"
                          style={{ left: `calc(${((threshold - 2.0) / 2.5) * 100}% - 10px)` }}
                        />
                      </div>
                      <div className={`flex justify-between text-[10px] font-mono ${
                        isDark ? 'text-zinc-400' : 'text-slate-500'
                      }`}>
                        <span>{ui.mock3Relaxed}</span>
                        <span className="text-rose-500 font-bold">{ui.mock3Redline}</span>
                        <span>{ui.mock3Strict}</span>
                      </div>
                    </div>

                    {/* Low-rating SKUs alert list */}
                    <div className={`p-3.5 rounded-2xl border space-y-2 transition-colors ${
                      isDark
                        ? 'bg-rose-950/20 border-rose-900/50'
                        : 'bg-rose-50/70 border-rose-200/90 shadow-[0_1px_3px_rgba(225,29,72,0.04)]'
                    }`}>
                      <div className={`flex items-center justify-between text-xs font-bold ${
                        isDark ? 'text-rose-300' : 'text-rose-800'
                      }`}>
                        <span>{ui.mock3AlertHeader.replace('{count}', String(alertCount))}</span>
                        <span className={`text-[10px] font-mono font-normal ${isDark ? 'text-rose-400/80' : 'text-rose-600'}`}>{ui.mock3AlertSub}</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className={`p-2 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                          isDark
                            ? 'bg-zinc-900/70 border-rose-900/40 text-white'
                            : 'bg-white border-rose-200/70 text-slate-900 shadow-sm'
                        }`}>
                          <div>
                            <span className={`font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>Little Tikes Chainsaw 2-in-1 (WMUS)</span>
                            <span className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock3ChainsawIssue}</span>
                          </div>
                          <span className={`text-base font-mono font-bold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>2.7</span>
                        </div>
                        <div className={`p-2 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                          isDark
                            ? 'bg-zinc-900/70 border-rose-900/40 text-white'
                            : 'bg-white border-rose-200/70 text-slate-900 shadow-sm'
                        }`}>
                          <div>
                            <span className={`font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>L.O.L. Flying Pixie (AMZUS)</span>
                            <span className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock3PixieIssue}</span>
                          </div>
                          <span className={`text-base font-mono font-bold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>2.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Slide 4: Deep VOC Attribution High-Res UI ── */}
                {currentSlide === 4 && (
                  <div className={`space-y-3.5 p-3.5 rounded-2xl border transition-colors ${
                    isDark
                      ? 'bg-zinc-900/40 border-zinc-800'
                      : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
                  }`}>
                    <div className={`flex items-center justify-between pb-2 border-b ${
                      isDark ? 'border-zinc-700/50' : 'border-slate-200/80'
                    }`}>
                      <div>
                        <span className={`text-xs font-bold ${isDark ? 'text-zinc-200' : 'text-slate-900'}`}>{ui.mock4VocTitle}</span>
                        <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock4VocSub}</p>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isDark
                          ? 'text-purple-400 bg-purple-500/10 border-purple-500/20'
                          : 'text-purple-700 bg-purple-50 border-purple-200 font-semibold'
                      }`}>
                        {ui.mock4NlpBadge}
                      </span>
                    </div>

                    {/* Defect Pareto Breakdown bars */}
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className={`font-medium ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>{ui.mock4DamageCat}</span>
                          <span className={`font-mono font-bold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>42% (52)</span>
                        </div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`}>
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: '42%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className={`font-medium ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>{ui.mock4FuncCat}</span>
                          <span className={`font-mono font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>28% (35)</span>
                        </div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`}>
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '28%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className={`font-medium ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>{ui.mock4PkgCat}</span>
                          <span className={`font-mono font-bold ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>18% (22)</span>
                        </div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`}>
                          <div className="h-full bg-cyan-500 rounded-full" style={{ width: '18%' }} />
                        </div>
                      </div>
                    </div>

                    {/* Real Review Evidence Quote */}
                    <div className={`p-3 rounded-2xl border space-y-1.5 text-xs transition-colors ${
                      isDark
                        ? 'bg-zinc-900/90 border-zinc-800 text-zinc-200'
                        : 'bg-slate-50 border-slate-200/90 text-slate-800'
                    }`}>
                      <div className={`flex items-center justify-between text-[10px] font-mono ${
                        isDark ? 'text-zinc-400' : 'text-slate-500'
                      }`}>
                        <span>{ui.mock4ReviewTag}</span>
                        <span className={`font-bold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>{ui.mock4ReviewStars}</span>
                      </div>
                      <p className={`italic leading-snug ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>
                        {ui.mock4Quote}
                      </p>
                      <div className="flex gap-1.5 pt-1">
                        <span className={`px-1.5 py-0.5 text-[9px] rounded font-mono border ${
                          isDark
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            : 'bg-rose-100 text-rose-700 border-rose-200/60'
                        }`}>
                          {ui.mock4TagBattery}
                        </span>
                        <span className={`px-1.5 py-0.5 text-[9px] rounded font-mono border ${
                          isDark
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-amber-100 text-amber-800 border-amber-200/60'
                        }`}>
                          {ui.mock4TagMotor}
                        </span>
                        <span className={`px-1.5 py-0.5 text-[9px] rounded font-mono border ${
                          isDark
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                            : 'bg-cyan-100 text-cyan-800 border-cyan-200/60'
                        }`}>
                          {ui.mock4TagSafety}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Slide 5: Autonomous Schedule Patrol High-Res UI ── */}
                {currentSlide === 5 && (
                  <div className={`space-y-3.5 p-3.5 rounded-2xl border transition-colors ${
                    isDark
                      ? 'bg-zinc-900/40 border-zinc-800'
                      : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
                  }`}>
                    <div className={`flex items-center justify-between pb-2 border-b ${
                      isDark ? 'border-zinc-700/50' : 'border-slate-200/80'
                    }`}>
                      <div>
                        <span className={`text-xs font-bold ${isDark ? 'text-zinc-200' : 'text-slate-900'}`}>{ui.mock5PatrolTitle}</span>
                        <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock5PatrolSub}</p>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isDark
                          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                          : 'text-emerald-700 bg-emerald-50 border-emerald-200 font-semibold'
                      }`}>
                        {ui.mock5EngineActive}
                      </span>
                    </div>

                    {/* Schedule policy status bar */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className={`p-2 rounded-xl border transition-colors ${
                        isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-slate-50 border-slate-200/80'
                      }`}>
                        <span className={`text-[10px] block ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock5FreqLabel}</span>
                        <span className={`font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {ui.mock5FreqVal.replace('{hours}', String(schedule.intervalMinutes / 60))}
                        </span>
                      </div>
                      <div className={`p-2 rounded-xl border transition-colors ${
                        isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-slate-50 border-slate-200/80'
                      }`}>
                        <span className={`text-[10px] block ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock5LastRunLabel}</span>
                        <span className={`font-bold font-mono ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{ui.mock5LastRunVal}</span>
                      </div>
                      <div className={`p-2 rounded-xl border transition-colors ${
                        isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-slate-50 border-slate-200/80'
                      }`}>
                        <span className={`text-[10px] block ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock5NextRunLabel}</span>
                        <span className={`font-bold font-mono ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>{ui.mock5NextRunVal}</span>
                      </div>
                    </div>

                    {/* Historical logs table */}
                    <div className="space-y-1.5">
                      <span className={`text-[10px] font-mono uppercase ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                        {ui.mock5AuditLogsTitle}
                      </span>
                      {logs.slice(0, 2).map((lg) => (
                        <div
                          key={lg.id}
                          className={`p-2 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                            isDark
                              ? 'bg-zinc-900/70 border-zinc-800'
                              : 'bg-slate-50 border-slate-200/80 text-slate-800'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{lg.id}</span>
                              <span className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{lg.runAt.replace('T', ' ').slice(0, 16)}</span>
                            </div>
                            <p className={`text-[10px] truncate max-w-[280px] ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
                              {lg.summaryMessage}
                            </p>
                          </div>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 border ${
                            isDark
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                              : 'bg-rose-100 text-rose-700 border-rose-200/60 font-medium'
                          }`}>
                            {ui.mock5AlertsFound.replace('{count}', String(lg.lowRatingAlertsCount))}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Slide 6: Deliverables & Zero-Config High-Res UI ── */}
                {currentSlide === 6 && (
                  <div className="space-y-4">
                    {/* Excel Structure Showcase */}
                    <div className={`p-3.5 rounded-2xl border space-y-2 transition-colors ${
                      isDark
                        ? 'bg-zinc-900/80 border-zinc-800'
                        : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
                    }`}>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-bold ${isDark ? 'text-zinc-200' : 'text-slate-900'}`}>{ui.mock6ExcelTitle}</span>
                        <span className={`font-mono text-[10px] font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{ui.mock6ExcelBadge}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className={`p-2 rounded-xl border transition-colors ${
                          isDark ? 'bg-zinc-950/60 border-zinc-800' : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/60'
                        }`}>
                          <span className={`font-bold block ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{ui.mock6Sheet1Title}</span>
                          <span className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock6Sheet1Desc}</span>
                        </div>
                        <div className={`p-2 rounded-xl border transition-colors ${
                          isDark ? 'bg-zinc-950/60 border-zinc-800' : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/60'
                        }`}>
                          <span className={`font-bold block ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{ui.mock6Sheet2Title}</span>
                          <span className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock6Sheet2Desc}</span>
                        </div>
                        <div className={`p-2 rounded-xl border transition-colors ${
                          isDark ? 'bg-zinc-950/60 border-zinc-800' : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/60'
                        }`}>
                          <span className={`font-bold block ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>{ui.mock6Sheet3Title}</span>
                          <span className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock6Sheet3Desc}</span>
                        </div>
                        <div className={`p-2 rounded-xl border transition-colors ${
                          isDark ? 'bg-zinc-950/60 border-zinc-800' : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/60'
                        }`}>
                          <span className={`font-bold block ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>{ui.mock6Sheet4Title}</span>
                          <span className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{ui.mock6Sheet4Desc}</span>
                        </div>
                      </div>
                    </div>

                    {/* Zero-Config Drag & Drop Deploy Box */}
                    <div className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
                      isDark
                        ? 'bg-emerald-950/20 border-emerald-900/50'
                        : 'bg-emerald-50/80 border-emerald-200/90 shadow-[0_1px_3px_rgba(16,185,129,0.04)]'
                    }`}>
                      <div className="space-y-1">
                        <span className={`text-xs font-bold block ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                          {ui.mock6DeployTitle}
                        </span>
                        <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                          {ui.mock6DeployDesc}
                        </p>
                      </div>
                      <span className={`px-3 py-1.5 text-xs font-bold rounded-full font-mono shrink-0 shadow-sm ${
                        isDark ? 'bg-emerald-500 text-slate-950' : 'bg-emerald-600 text-white'
                      }`}>
                        {ui.mock6DeployBadge}
                      </span>
                    </div>
                  </div>
                )}

                {/* ── Slide 7: Epilogue & Launch Call to Action ── */}
                {currentSlide === 7 && (
                  <div className="p-6 text-center space-y-6">
                    <div className={`inline-block p-4 rounded-3xl border shadow-xl transition-colors ${
                      isDark ? 'bg-zinc-900 border-zinc-700/60' : 'bg-white border-slate-200/90'
                    }`}>
                      <Mgalogo size="lg" />
                    </div>

                    <div className="space-y-2">
                      <h3 className={`text-xl font-extrabold tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {ui.mock7EpilogueTitle}
                      </h3>
                      <p className={`text-xs max-w-md mx-auto leading-relaxed ${
                        isDark ? 'text-zinc-400' : 'text-slate-600'
                      }`}>
                        {ui.mock7EpilogueDesc}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <button
                        onClick={onClose}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-lg flex items-center gap-2 ${
                          isDark
                            ? 'bg-white text-slate-950 hover:bg-zinc-200'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        <span>{ui.mock7BtnEnter}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => goToSlide(0)}
                        className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                          isDark
                            ? 'bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700'
                            : 'bg-white text-slate-800 hover:bg-slate-100 border-slate-200/90 shadow-sm'
                        }`}
                      >
                        {ui.mock7BtnReplay}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Speaker Notes Drawer (Jobsian Presenter Script) ── */}
      {showSpeakerNotes && (
        <div
          className={`shrink-0 p-5 border-t backdrop-blur-2xl transition-all animate-in slide-in-from-bottom-4 duration-300 ${
            isDark ? 'bg-zinc-950/95 border-white/10 text-zinc-200' : 'bg-white/95 border-black/10 text-slate-800'
          }`}
        >
          <div className="max-w-5xl mx-auto flex items-start gap-4">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  {ui.speakerNotesTitle}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {ui.slideCounter
                    .replace('{current}', String(currentSlide + 1))
                    .replace('{total}', String(slides.length))}
                </span>
              </div>
              <p className={`text-xs md:text-sm leading-relaxed font-normal ${
                isDark ? 'text-zinc-300' : 'text-slate-700'
              }`}>
                {currentSlideData.speakerNotes}
              </p>
            </div>
            <button
              onClick={() => setShowSpeakerNotes(false)}
              className={`text-xs cursor-pointer p-1 transition-colors ${
                isDark ? 'text-zinc-500 hover:text-zinc-200' : 'text-slate-400 hover:text-slate-800'
              }`}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ── Bottom Dock Controller: Apple Keynote Style ── */}
      <footer
        className={`h-16 px-6 md:px-12 flex items-center justify-between shrink-0 border-t backdrop-blur-xl ${
          isDark ? 'border-white/10 bg-black/60' : 'border-black/[0.06] bg-white/70'
        }`}
      >
        {/* Previous Slide / Step */}
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0 && currentStep === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            currentSlide === 0 && currentStep === 0
              ? 'opacity-30 cursor-not-allowed text-zinc-500'
              : isDark
              ? 'bg-zinc-900 text-white hover:bg-zinc-800 border border-white/10'
              : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-black/5'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{ui.prevButton}</span>
        </button>

        {/* Center: Interactive Slide Navigator Dots */}
        <div className="hidden sm:flex items-center gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goToSlide(idx)}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentSlide
                  ? isDark
                    ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]'
                    : 'w-8 bg-slate-900'
                  : isDark
                  ? 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              title={`${idx + 1}. ${s.title}`}
            />
          ))}
        </div>

        {/* Next Slide / Step */}
        <button
          onClick={handleNext}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-md font-sans ${
            isDark
              ? 'bg-white text-slate-950 hover:bg-zinc-200'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          <span>
            {currentStep < currentSlideData.steps.length - 1
              ? ui.nextStep
              : currentSlide === slides.length - 1
              ? ui.finishKeynote
              : ui.nextSlide}
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
