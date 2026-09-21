import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Creative Android Hardware Sensors & Haptics Hook for Study4XM Masterbook
 * 
 * Features:
 * 1. Accelerometer Motion & Shake-to-Recall (ঝাঁকিয়ে নতুন প্রশ্ন/ফ্ল্যাশকার্ড আনুন)
 * 2. Multi-tier Haptic Vibration Feedback (ট্যাকটাইল বা ভাইব্রেশন রেসপন্স)
 * 3. 3D Gyroscope / Device Orientation Tilt (পৃষ্ঠা ত্রিমাত্রিক হেলে পড়া)
 * 4. Ambient Light Adaptability & Offline Network status
 */
export function useDeviceSensors({ onShakeDetected } = {}) {
  const [isSensorAvailable, setIsSensorAvailable] = useState(false);
  const [isHapticAvailable, setIsHapticAvailable] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine ?? true);
  const [tilt, setTilt] = useState({ gamma: 0, beta: 0 });
  const [shakeToast, setShakeToast] = useState(null);

  const lastMotionRef = useRef({ x: null, y: null, z: null, time: 0 });
  const lastShakeTimeRef = useRef(0);

  // Check hardware vibration capability
  useEffect(() => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      setIsHapticAvailable(true);
    }
  }, []);

  // Multi-tier Haptic Vibration Engine
  const triggerHaptic = useCallback((patternType = 'tap') => {
    if (typeof window === 'undefined' || !('vibrate' in navigator)) return;

    try {
      switch (patternType) {
        case 'pageTurn':
          navigator.vibrate(15);
          break;
        case 'tap':
          navigator.vibrate(25);
          break;
        case 'success':
          // Confident double-pulse
          navigator.vibrate([35, 40, 70]);
          break;
        case 'warning':
          // Gentle warning nudge
          navigator.vibrate([60, 40, 60]);
          break;
        case 'error':
          // Triplet warning pulse
          navigator.vibrate([100, 50, 100, 50, 120]);
          break;
        case 'shake':
          // Distinct rumble for motion gesture
          navigator.vibrate([50, 40, 60, 40, 70]);
          break;
        case 'alarm':
          // Exam countdown alert
          navigator.vibrate([150, 80, 150, 80, 200]);
          break;
        default:
          navigator.vibrate(30);
      }
    } catch {
      // Ignored if user device restricts vibration
    }
  }, []);

  // Accelerometer Shake Detection
  useEffect(() => {
    if (typeof window === 'undefined' || !window.DeviceMotionEvent) return;
    setIsSensorAvailable(true);

    const SHAKE_THRESHOLD = 16.5; // Acceleration sensitivity threshold
    const SHAKE_COOLDOWN = 1400; // ms between shake events

    const handleMotion = (event) => {
      const current = event.accelerationIncludingGravity || event.acceleration;
      if (!current) return;

      const currentTime = Date.now();
      const last = lastMotionRef.current;

      if (last.x !== null) {
        const deltaX = Math.abs(current.x - last.x);
        const deltaY = Math.abs(current.y - last.y);
        const deltaZ = Math.abs(current.z - last.z);

        const totalDelta = deltaX + deltaY + deltaZ;

        if (totalDelta > SHAKE_THRESHOLD) {
          if (currentTime - lastShakeTimeRef.current > SHAKE_COOLDOWN) {
            lastShakeTimeRef.current = currentTime;
            triggerHaptic('shake');

            setShakeToast('📱 ডিভাইস ঝাঁকানো হয়েছে: তাৎক্ষণিক প্রস্তুতি চর্চা সক্রিয়!');
            setTimeout(() => setShakeToast(null), 3000);

            if (onShakeDetected) {
              onShakeDetected();
            }
          }
        }
      }

      lastMotionRef.current = {
        x: current.x || 0,
        y: current.y || 0,
        z: current.z || 0,
        time: currentTime
      };
    };

    window.addEventListener('devicemotion', handleMotion, { passive: true });
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [triggerHaptic, onShakeDetected]);

  // Gyroscope / Orientation Tilt
  useEffect(() => {
    if (typeof window === 'undefined' || !window.DeviceOrientationEvent) return;

    const handleOrientation = (event) => {
      if (event.gamma !== null && event.beta !== null) {
        // Gamma: left to right (-25 to 25), Beta: front to back (-25 to 25)
        const clampedGamma = Math.max(-25, Math.min(25, event.gamma));
        const clampedBeta = Math.max(-25, Math.min(25, event.beta));
        setTilt({ gamma: clampedGamma, beta: clampedBeta });
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  // Network Sensor
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      triggerHaptic('success');
    };
    const handleOffline = () => {
      setIsOnline(false);
      triggerHaptic('warning');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [triggerHaptic]);

  // Request permissions if needed
  const requestMotionPermission = async () => {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const response = await DeviceMotionEvent.requestPermission();
        if (response === 'granted') {
          triggerHaptic('success');
          setIsSensorAvailable(true);
          return true;
        }
      } catch (err) {
        console.warn('Sensor permission error:', err);
      }
    }
    return false;
  };

  return {
    isSensorAvailable,
    isHapticAvailable,
    isOnline,
    tilt,
    shakeToast,
    triggerHaptic,
    requestMotionPermission
  };
}
