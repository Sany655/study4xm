import React, { useState } from 'react';
import { ArrowDown, ArrowRight, BookOpen, Check, CreditCard, LockKeyhole, LogOut, Mail, ShieldCheck, Smartphone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { paymentService } from '../services/paymentService';
import { ACADEMIC_YEARS, DEGREE_INFO } from '../data/curriculumRegistry';
import './premium-access.css';

const included = [
  'Complete course library and guided lessons',
  'Practice questions, flashcards, and revision tools',
  'Writing trainer, mistake notebook, and progress tracking',
  'ICT and Economics mixed timed quiz plus study tools',
  'Access on the website and Android app'
];

const availableCourses = ACADEMIC_YEARS[0].courses;

function clearPendingCheckout() {
  try {
    sessionStorage.removeItem('study4xm_pending_checkout');
    sessionStorage.removeItem('study4xm_pending_transaction');
  } catch {}
}

export default function PremiumAccessPage() {
  const { currentUser, userData, signup, login, logout, refreshUserData } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [providers] = useState(() => paymentService.getAvailableProviders());
  const [providerId, setProviderId] = useState(() => paymentService.getAvailableProviders()[0]?.id || '');
  const [error, setError] = useState('');
  const [authBusy, setAuthBusy] = useState(false);
  const [pendingTransactionId] = useState(() => {
    try {
      const pendingTransaction = sessionStorage.getItem('study4xm_pending_transaction') || '';
      const [uid, transactionId] = pendingTransaction.split(':');
      return uid === currentUser?.uid ? transactionId : '';
    } catch {
      return '';
    }
  });
  const [checkoutState, setCheckoutState] = useState(() => {
    try {
      return currentUser && sessionStorage.getItem('study4xm_pending_checkout') === currentUser.uid ? 'pending' : 'idle';
    } catch {
      return 'idle';
    }
  });

  const handleAccountSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setAuthBusy(true);
    try {
      if (isLogin) await login(email, password);
      else await signup(email, password);
    } catch (authError) {
      setError(authError.message || 'We could not access this account. Please try again.');
    } finally {
      setAuthBusy(false);
    }
  };

  const handleCheckout = async () => {
    if (!currentUser || !providerId) return;
    if (customerName.trim().length < 2 || !/^\+?[0-9\s()-]{8,20}$/.test(phone)) {
      setError('Enter your full name and a valid phone number to continue.');
      return;
    }
    setError('');
    setCheckoutState('initiating');
    try {
      sessionStorage.setItem('study4xm_pending_checkout', currentUser.uid);
    } catch {}
    try {
      const result = await paymentService.processPayment(providerId, { name: customerName, phone }, 500);
      if (result.status === 'redirecting') {
        setCheckoutState('pending');
        return;
      }

      const refreshedUser = await refreshUserData();
      if (refreshedUser?.isPremium) {
        clearPendingCheckout();
        setCheckoutState('confirmed');
      } else {
        setCheckoutState('pending');
      }
    } catch (paymentError) {
      clearPendingCheckout();
      setError(paymentError.message || 'Checkout could not be started. Please try again.');
      setCheckoutState('idle');
    }
  };

  const handleCheckAccess = async () => {
    setError('');
    setCheckoutState('checking');
    try {
      if (pendingTransactionId) {
        const paymentStatus = await paymentService.checkPaymentStatus(pendingTransactionId);
        if (paymentStatus.status === 'failed') {
          clearPendingCheckout();
          setError('The provider did not confirm this payment. You can start a new checkout.');
          setCheckoutState('idle');
          return;
        }
      }
      const refreshedUser = await refreshUserData();
      if (refreshedUser?.isPremium) {
        clearPendingCheckout();
        setCheckoutState('confirmed');
      } else {
        setCheckoutState('pending');
      }
    } catch {
      setError('We could not check your payment status. Please try again.');
      setCheckoutState('pending');
    }
  };

  const checkoutReturn = new URLSearchParams(window.location.search).get('checkout');

  return (
    <main className="premium-access">
      <header className="premium-nav">
        <a className="premium-brand" href="#top" aria-label="Study4XM home">
          <span className="premium-brand-mark"><BookOpen size={20} /></span>
          <span>Study4XM</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#courses">Subjects</a>
          <a href="#included">What's included</a>
          <a href="#access">Get access</a>
        </nav>
        {currentUser ? (
          <button className="premium-nav-action" onClick={logout}><LogOut size={16} /> Sign out</button>
        ) : (
          <a className="premium-nav-action" href="#access" onClick={() => { setIsLogin(true); setError(''); }}>Sign in <ArrowRight size={16} /></a>
        )}
      </header>

      <section className="premium-hero" id="top">
        <div className="premium-hero-copy">
          <p className="premium-eyebrow">Study4XM · Built for National University learners</p>
          <h1>One home for your university courses.</h1>
          <p className="premium-hero-lede">We are starting with {availableCourses.length} active first-year subjects from BSS Honours Sociology. More National University programs are planned; only the courses listed below are available today.</p>
          <div className="premium-hero-actions">
            <a className="premium-primary-button" href="#access">Get lifetime access <ArrowRight size={18} /></a>
            <a className="premium-text-link" href="#included">Explore what's inside <ArrowDown size={16} /></a>
          </div>
          <p className="premium-hero-note"><LockKeyhole size={15} /> Study content is available after payment is confirmed.</p>
        </div>
        <div className="premium-hero-art" aria-hidden="true">
          <div className="premium-book-cover">
            <span className="premium-cover-kicker">STUDY4XM / PREMIUM</span>
            <BookOpen size={42} strokeWidth={1.3} />
            <strong>Learn.<br />Practice.<br />Remember.</strong>
            <span className="premium-cover-rule" />
            <span className="premium-cover-caption">Your complete exam workspace</span>
          </div>
          <div className="premium-stamp"><Check size={15} /> ONE PASS<br />ALL TOOLS</div>
        </div>
      </section>

      <section className="premium-proof" aria-label="Study system highlights">
        <div><strong>Learn</strong><span>Structured course material</span></div>
        <div><strong>Practice</strong><span>Questions and timed exams</span></div>
        <div><strong>Improve</strong><span>Revision built around your progress</span></div>
      </section>

      <section className="premium-courses" id="courses">
        <div className="premium-section-heading">
          <p className="premium-eyebrow">What you can study now</p>
          <h2>Available now: {DEGREE_INFO.degreeNameEn} in Sociology, Year 1</h2>
          <p>These {availableCourses.length} subjects make up the current course pack. Other NU programs and Years 2–4 are planned; their lessons are not available or included in this purchase today.</p>
        </div>
        <div className="premium-course-list">
          {availableCourses.map((course, index) => (
            <article className="premium-course-row" key={course.id}>
              <span className="premium-course-number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{course.titleBn}</h3>
                <p className="premium-course-english">{course.titleEn}</p>
                <p className="premium-course-description">{course.descriptionBn}</p>
              </div>
              <span className="premium-course-year">1st year</span>
            </article>
          ))}
        </div>
        <p className="premium-roadmap-note"><span aria-hidden="true">●</span> Study4XM is designed to grow across National University courses. At present, only the Sociology Year 1 pack above has active lessons.</p>
      </section>

      <section className="premium-included" id="included">
        <div className="premium-section-heading">
          <p className="premium-eyebrow">Inside your study space</p>
          <h2>Everything in one place.</h2>
          <p>Get the complete learning workspace, not a collection of disconnected add-ons.</p>
        </div>
        <div className="premium-included-grid">
          {included.map((item, index) => (
            <div className="premium-included-item" key={item}>
              <span className="premium-item-number">0{index + 1}</span>
              <p>{item}</p>
              <Check size={18} aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      <section className="premium-access-section" id="access">
        <div className="premium-price-panel">
          <p className="premium-eyebrow">Current course pack · Single purchase</p>
          <h2>BSS Sociology · Year 1</h2>
          <p className="premium-price"><span>৳</span>500 <small>one time</small></p>
          <p className="premium-price-description">Unlock the currently active Sociology Year 1 pack on your account, across web and Android. Future course packs are planned but are not available or included today.</p>
          <ul>
            <li><Check size={17} /> 8 active first-year subjects</li>
            <li><Check size={17} /> All practice and revision tools</li>
            <li><Check size={17} /> ICT + Economics timed practice quiz</li>
          </ul>
          <p className="premium-payment-note"><ShieldCheck size={16} /> Access is enabled only after payment verification.</p>
        </div>

        <div className="premium-account-panel">
          {!currentUser ? (
            <>
              <div className="premium-account-heading">
                <span className="premium-step">01</span>
                <div><h3>{isLogin ? 'Sign in to continue' : 'Create your account'}</h3><p>Your email will be your premium access account.</p></div>
              </div>
              {error && <p className="premium-alert" role="alert">{error}</p>}
              <form className="premium-account-form" onSubmit={handleAccountSubmit}>
                <label>Email address<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
                <label>Password<input type="password" autoComplete={isLogin ? 'current-password' : 'new-password'} minLength={6} required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
                <button className="premium-primary-button premium-form-button" type="submit" disabled={authBusy}>{authBusy ? 'Please wait...' : isLogin ? 'Sign in' : 'Create account'} <ArrowRight size={18} /></button>
              </form>
              <button className="premium-switch-mode" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                {isLogin ? 'New to Study4XM? Create an account' : 'Already have an account? Sign in'}
              </button>
            </>
          ) : (
            <>
              <div className="premium-account-heading">
                <span className="premium-step">01</span>
                <div><h3>Account ready</h3><p className="premium-account-email"><Mail size={15} /> {currentUser.email}</p></div>
              </div>
              {userData?.isPremium ? (
                <div className="premium-confirmed"><ShieldCheck size={27} /><strong>Premium confirmed</strong><span>Your study workspace is ready.</span></div>
              ) : (
                <>
                  <div className="premium-account-heading premium-step-two">
                    <span className="premium-step">02</span>
                    <div><h3>Choose a payment method</h3><p>After checkout, we verify the payment before opening your study space.</p></div>
                  </div>
                  <div className="premium-provider-list" role="radiogroup" aria-label="Payment method">
                    {providers.map((provider) => (
                      <label className={`premium-provider ${providerId === provider.id ? 'is-selected' : ''}`} key={provider.id}>
                        <input type="radio" name="payment-provider" value={provider.id} checked={providerId === provider.id} disabled={!provider.available} onChange={() => setProviderId(provider.id)} />
                        {provider.type === 'native' ? <Smartphone size={20} /> : <CreditCard size={20} />}
                        <span>{provider.name}</span>
                        <span className="premium-provider-check"><Check size={14} /></span>
                      </label>
                    ))}
                  </div>
                  {providers.find((provider) => provider.id === providerId)?.available && (
                    <div className="premium-customer-fields">
                      <label>Full name<input autoComplete="name" required value={customerName} onChange={(event) => setCustomerName(event.target.value)} /></label>
                      <label>Phone number<input type="tel" autoComplete="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} /></label>
                    </div>
                  )}
                  {!providers.some((provider) => provider.available) && (
                    <div className="premium-pending" role="note">
                      <ShieldCheck size={19} />
                      <span>AamarPay checkout is supported on web once configured. Stripe and Google Play Billing need separate verified server integrations before they can be enabled.</span>
                    </div>
                  )}
                  {error && <p className="premium-alert" role="alert">{error}</p>}
                  {checkoutReturn === 'failed' && <p className="premium-alert" role="status">The payment did not complete. No charge confirmation was received; you can try again.</p>}
                  {checkoutReturn === 'cancelled' && <p className="premium-pending" role="status">Checkout was cancelled. Your account remains locked until a payment is completed and verified.</p>}
                  {(checkoutReturn === 'pending' || (checkoutReturn === 'confirmed' && !userData?.isPremium)) && <p className="premium-pending" role="status">We are still waiting for the provider to confirm your payment. Your access remains locked for now.</p>}
                  {(checkoutState === 'pending' || checkoutState === 'checking') && <div className="premium-pending" role="status"><ShieldCheck size={19} /><span>Payment received or checkout returned. Access stays locked until provider confirmation arrives.</span></div>}
                  {checkoutState === 'confirmed' && <div className="premium-confirmed" role="status"><ShieldCheck size={27} /><strong>Premium confirmed</strong><span>Your study workspace is ready.</span></div>}
                  {(checkoutState === 'pending' || checkoutState === 'checking') ? (
                    <button className="premium-primary-button premium-form-button" onClick={handleCheckAccess} disabled={checkoutState === 'checking'}>{checkoutState === 'checking' ? 'Checking status...' : 'Check payment status'} <ArrowRight size={18} /></button>
                  ) : checkoutState !== 'confirmed' ? (
                    <button className="premium-primary-button premium-form-button" onClick={handleCheckout} disabled={!providerId || !providers.find((provider) => provider.id === providerId)?.available || checkoutState === 'initiating'}>
                      {checkoutState === 'initiating' ? 'Starting checkout...' : providers.some((provider) => provider.available) ? 'Continue to payment' : 'Checkout setup required'} <ArrowRight size={18} />
                    </button>
                  ) : null}
                </>
              )}
            </>
          )}
        </div>
      </section>

      <section className="premium-faq">
        <h2>Simple access, start to finish.</h2>
        <div><span>01</span><p>Create or sign in to your Study4XM account.</p></div>
        <div><span>02</span><p>Choose a payment method and complete checkout.</p></div>
        <div><span>03</span><p>Once payment is confirmed, open the same account on web or Android.</p></div>
      </section>

      <footer className="premium-footer"><span>Study4XM</span><span>One account. One complete study space.</span></footer>
    </main>
  );
}