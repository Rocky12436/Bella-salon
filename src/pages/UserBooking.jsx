import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Check, Calendar, MapPin, User, ChevronRight, ArrowLeft, Plus, MessageSquare, Star, Gift, Sparkles, Scissors, Smile, Heart, Trash2 } from 'lucide-react';

export default function UserBooking() {
  const { services, packages, addOns, addBooking, addFeedback } = useBooking();
  const [step, setStep] = useState(1);
  const [serviceTab, setServiceTab] = useState('individual'); // 'individual' or 'packages'

  const [formData, setFormData] = useState({
    services: [], // Array for multiple selection
    selectedPackage: null, // Holds selected package if any
    addOns: [], // Array for selected add-ons
    date: '',
    stylist: '',
    time: '',
    seat: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [bookingRef, setBookingRef] = useState('');

  // Post-visit Feedback form state
  const [feedbackForm, setFeedbackForm] = useState({
    customerName: '',
    service: 'Haircut & Styling',
    stylist: 'Priya Sharma',
    rating: 5,
    comment: '',
    issues: []
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const slots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'];
  const takenSlots = ['9:30 AM', '11:00 AM', '2:30 PM', '4:30 PM'];

  const stylingChairs = ['Chair-1', 'Chair-2', 'Chair-3', 'Chair-4', 'Chair-5', 'Chair-6'];
  const spaRooms = ['SPA-1', 'SPA-2', 'SPA-3', 'SPA-4'];
  const occupiedChairs = ['Chair-2', 'Chair-4', 'SPA-1'];

  const handleNext = () => setStep(s => Math.min(s + 1, 6));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const toggleService = (s) => {
    // Clear package if selecting individual services
    const exists = formData.services.find(item => item.name === s.name);
    if (exists) {
      setFormData({
        ...formData,
        selectedPackage: null,
        services: formData.services.filter(item => item.name !== s.name)
      });
    } else {
      setFormData({
        ...formData,
        selectedPackage: null,
        services: [...formData.services, s]
      });
    }
  };

  const selectPackage = (pkg) => {
    setFormData({
      ...formData,
      services: [], // clear individual
      selectedPackage: pkg
    });
  };

  const toggleAddOn = (addon) => {
    const exists = formData.addOns.find(item => item.name === addon.name);
    if (exists) {
      setFormData({
        ...formData,
        addOns: formData.addOns.filter(item => item.name !== addon.name)
      });
    } else {
      setFormData({
        ...formData,
        addOns: [...formData.addOns, addon]
      });
    }
  };

  const calculateTotal = () => {
    let basePrice = 0;
    if (formData.selectedPackage) {
      basePrice = parseInt(formData.selectedPackage.price.replace(/[^\d]/g, ''), 10);
    } else {
      basePrice = formData.services.reduce((total, s) => {
        const numericPrice = parseInt(s.price.replace(/[^\d]/g, ''), 10);
        return total + (isNaN(numericPrice) ? 0 : numericPrice);
      }, 0);
    }

    const addOnsPrice = formData.addOns.reduce((total, a) => {
      const numericPrice = parseInt(a.price.replace(/[^\d]/g, ''), 10);
      return total + (isNaN(numericPrice) ? 0 : numericPrice);
    }, 0);

    return basePrice + addOnsPrice;
  };

  const submitBooking = () => {
    const serviceNames = formData.selectedPackage
      ? formData.selectedPackage.name
      : formData.services.map(s => s.name).join(' & ');

    const addOnNames = formData.addOns.map(a => a.name).join(', ');
    const finalServiceString = serviceNames + (addOnNames ? ` + Add-ons: ${addOnNames}` : '');
    const finalNotes = formData.notes + (addOnNames ? `\n[Add-ons: ${addOnNames}]` : '');

    const ref = addBooking({
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      email: formData.email,
      service: finalServiceString,
      date: formData.date,
      time: formData.time,
      seat: formData.seat,
      stylist: formData.stylist || 'Any Available',
      notes: finalNotes
    });
    setBookingRef(ref.id);
    setStep(6);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    addFeedback(feedbackForm);
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setShowFeedbackModal(false);
      setFeedbackSubmitted(false);
      setFeedbackForm({ customerName: '', service: 'Haircut & Styling', stylist: 'Priya Sharma', rating: 5, comment: '', issues: [] });
    }, 2500);
  };

  const toggleFeedbackIssue = (issue) => {
    setFeedbackForm(prev => ({
      ...prev,
      issues: prev.issues.includes(issue)
        ? prev.issues.filter(i => i !== issue)
        : [...prev.issues, issue]
    }));
  };

  const StepIndicator = () => (
    <div className="steps-bar-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '36px', overflowX: 'auto' }}>
      {[
        { n: 1, label: 'Service' },
        { n: 2, label: 'Schedule' },
        { n: 3, label: 'Seat' },
        { n: 4, label: 'Details' },
        { n: 5, label: 'Confirm' }
      ].map((s, i) => (
        <React.Fragment key={s.n}>
          <div className="step-label" style={{
            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase',
            color: step === s.n ? 'var(--gold-dark)' : step > s.n ? 'var(--success)' : 'var(--soft)'
          }}>
            <div className="step-circle" style={{
              width: '28px', height: '28px', borderRadius: '50%', border: `1.5px solid ${step === s.n ? 'var(--gold)' : step > s.n ? 'var(--success)' : 'var(--border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', background: step >= s.n ? (step === s.n ? 'var(--gold)' : 'var(--success)') : '#fff', color: step >= s.n ? '#fff' : 'inherit'
            }}>
              {step > s.n ? <Check size={14} /> : s.n}
            </div>
            {s.label}
          </div>
          {i < 4 && <div className="step-line" style={{ width: '40px', height: '1px', background: 'var(--border)', margin: '0 12px' }}></div>}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="fade-in" style={{ position: 'relative', paddingBottom: '80px' }}>

      {/* Hero Header */}
      <div className="hero-container" style={{ background: 'var(--charcoal)', padding: '60px 2rem 48px', textAlign: 'center', position: 'relative' }}>
        <div style={{ display: 'inline-block', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--gold-dark)', padding: '6px 20px', borderRadius: '100px', marginBottom: '24px' }}>Unisex Luxury Salon</div>
        <h1 className="hero-title" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '56px', fontWeight: '300', color: '#fff', lineHeight: '1.15', marginBottom: '16px' }}>Your Perfect<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Look Awaits</em></h1>
        <p style={{ color: '#999', fontSize: '16px', maxWidth: '400px', margin: '0 auto 20px' }}>Book a premium hair, facial, or spa experience — tailored just for you.</p>

        {/* Floating feedback portal trigger */}
        <button
          onClick={() => setShowFeedbackModal(true)}
          style={{
            background: 'rgba(201, 168, 76, 0.15)', border: '1px solid var(--gold)', color: 'var(--gold-light)',
            padding: '8px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gold)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(201, 168, 76, 0.15)'}
        >
          <MessageSquare size={14} /> Rate Your Last Visit
        </button>
      </div>

      <div className="booking-content-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        {step < 6 && <StepIndicator />}

        {/* STEP 1: Service (Enhanced with Right-Side Sticky Sidebar Checkout Widget) */}
        {step === 1 && (
          <div className="booking-step1-wrapper">

            {/* Catalog list section (Left Column) */}
            <div className="booking-catalog-column fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '28px', color: 'var(--dark)', margin: 0 }}>Choose Treatments</h2>
                    {(formData.services.length > 0 || formData.selectedPackage) && (
                      <button 
                        className="btn btn-gold" 
                        onClick={handleNext}
                        style={{ padding: '6px 14px', borderRadius: '4px', fontSize: '12px', gap: '4px', margin: 0, height: 'auto', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                      >
                        Continue (₹{calculateTotal().toLocaleString()}) <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                  <p style={{ color: 'var(--soft)', fontSize: '12px', marginTop: '4px' }}>Select multiple services to build your customized pampering session.</p>
                </div>

                {/* Tab Selector for Service Type */}
                <div style={{ display: 'flex', background: 'var(--cream)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <button
                    onClick={() => setServiceTab('individual')}
                    style={{
                      padding: '8px 16px', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                      background: serviceTab === 'individual' ? '#fff' : 'transparent',
                      color: serviceTab === 'individual' ? 'var(--dark)' : 'var(--soft)',
                      boxShadow: serviceTab === 'individual' ? 'var(--shadow-sm)' : 'none'
                    }}
                  >
                    Services
                  </button>
                  <button
                    onClick={() => setServiceTab('packages')}
                    style={{
                      padding: '8px 16px', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                      background: serviceTab === 'packages' ? '#fff' : 'transparent',
                      color: serviceTab === 'packages' ? 'var(--dark)' : 'var(--soft)',
                      boxShadow: serviceTab === 'packages' ? 'var(--shadow-sm)' : 'none'
                    }}
                  >
                    👑 Combo Packages
                  </button>
                </div>
              </div>

              {serviceTab === 'individual' ? (
                <div className="booking-individual-grid">
                  {services.map(s => {
                    const isSelected = formData.services.some(item => item.name === s.name);
                    return (
                      <div key={s.name}
                        onClick={() => toggleService(s)}
                        style={{
                          border: `1.5px solid ${isSelected ? 'var(--gold)' : 'var(--border)'}`,
                          borderRadius: 'var(--radius)', cursor: 'pointer', background: isSelected ? '#fff' : 'var(--cream)',
                          overflow: 'hidden', transition: 'all 0.3s', boxShadow: isSelected ? 'var(--shadow-gold)' : 'none', transform: isSelected ? 'translateY(-2px)' : 'none',
                          position: 'relative'
                        }}>
                        <div style={{ width: '100%', height: '120px', overflow: 'hidden' }}>
                          <img src={s.img} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        {isSelected && (
                          <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--gold)', color: '#fff', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
                            <Check size={16} />
                          </div>
                        )}
                        <div style={{ padding: '16px' }}>
                          <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>{s.icon}</span>
                          <div style={{ fontWeight: '600', color: 'var(--dark)', fontSize: '15px', marginBottom: '4px' }}>{s.name}</div>
                          <div style={{ fontSize: '13px', color: 'var(--soft)' }}>Starting {s.price} · {s.duration}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="booking-packages-grid">
                  {packages.map(pkg => {
                    const isSelected = formData.selectedPackage?.name === pkg.name;
                    return (
                      <div key={pkg.name}
                        onClick={() => selectPackage(pkg)}
                        style={{
                          border: `2px solid ${isSelected ? 'var(--gold)' : 'var(--border)'}`,
                          borderRadius: 'var(--radius)', cursor: 'pointer', background: isSelected ? '#fff' : 'var(--cream)',
                          overflow: 'hidden', transition: 'all 0.3s', boxShadow: isSelected ? 'var(--shadow-gold)' : 'none',
                          position: 'relative', display: 'flex', flexDirection: 'column'
                        }}>
                        <div style={{ width: '100%', height: '120px', overflow: 'hidden', position: 'relative' }}>
                          <img src={pkg.img} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <span style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'var(--charcoal)', color: 'var(--gold-light)', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
                            {pkg.savings}
                          </span>
                          {isSelected && (
                            <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--gold)', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Check size={18} />
                            </div>
                          )}
                        </div>
                        <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <span style={{ fontSize: '20px' }}>{pkg.icon}</span>
                              <h3 style={{ fontSize: '15px', fontWeight: '600', margin: 0, color: 'var(--dark)' }}>{pkg.name}</h3>
                            </div>
                            <p style={{ fontSize: '12px', color: 'var(--soft)', marginBottom: '12px' }}>{pkg.description}</p>
                          </div>

                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                              <div>
                                <span style={{ fontSize: '11px', color: 'var(--soft)', display: 'block' }}>Price</span>
                                <strong style={{ fontSize: '16px', color: 'var(--gold-dark)' }}>{pkg.price}</strong>
                              </div>
                              <span style={{ fontSize: '11px', color: 'var(--soft)' }}>⏱️ {pkg.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR STICKY WIDGET (Resolves User Complaint about scrolling down) */}
            <div className="booking-summary-sidebar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '16px' }}>
                <Sparkles size={18} className="text-gold" />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'var(--dark)' }}>Session Summary</h3>
              </div>

              {formData.services.length === 0 && !formData.selectedPackage ? (
                <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--soft)', fontSize: '13px' }}>
                  Select treatments or package combo deals to build your luxury session!
                </div>
              ) : (
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                  <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '16px' }}>
                    {formData.selectedPackage ? (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--pending-bg)', border: '1px solid var(--gold-light)', padding: '8px 12px', borderRadius: '8px', marginBottom: '8px' }}>
                        <div style={{ flex: 1, marginRight: '8px' }}>
                          <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--pending)' }}>👑 {formData.selectedPackage.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--soft)', marginTop: '2px' }}>{formData.selectedPackage.price}</div>
                        </div>
                        <button
                          onClick={() => setFormData({ ...formData, selectedPackage: null })}
                          style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '14px', padding: '4px' }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      formData.services.map(s => (
                        <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--cream)', padding: '8px 12px', borderRadius: '8px', marginBottom: '8px' }}>
                          <div style={{ flex: 1, marginRight: '8px' }}>
                            <div style={{ fontWeight: '600', fontSize: '13px', color: 'var(--dark)' }}>{s.icon} {s.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--soft)', marginTop: '2px' }}>{s.price}</div>
                          </div>
                          <button
                            onClick={() => toggleService(s)}
                            style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '14px', padding: '4px' }}
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--soft)' }}>Total Duration:</span>
                      <strong style={{ fontSize: '12px', color: 'var(--mid)' }}>
                        {formData.selectedPackage ? formData.selectedPackage.duration : `${formData.services.reduce((acc, s) => acc + parseInt(s.duration.match(/\d+/)?.[0] || '0', 10), 0)} min`}
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--dark)' }}>Total Subtotal:</span>
                      <strong style={{ fontSize: '22px', fontWeight: '700', color: 'var(--gold-dark)', fontFamily: '"Cormorant Garamond", serif' }}>
                        ₹{calculateTotal().toLocaleString()}
                      </strong>
                    </div>
                  </div>

                  <button
                    className="btn btn-gold"
                    onClick={handleNext}
                    style={{ width: '100%', padding: '12px', fontSize: '13px', gap: '6px', height: '46px' }}
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* STEP 2: Date & Time */}
        {step === 2 && (
          <div className="fade-in">
            <div className="card">
              <h2 className="card-title">Select Date & Stylist</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Preferred Stylist</label>
                  <select value={formData.stylist} onChange={e => setFormData({ ...formData, stylist: e.target.value })}>
                    <option value="">Any Available (Fastest)</option>
                    <option value="Priya Sharma">Priya Sharma — Senior Stylist</option>
                    <option value="Rahul Mehta">Rahul Mehta — Hair Expert</option>
                    <option value="Ananya Das">Ananya Das — Spa Specialist</option>
                    <option value="Karan Nair">Karan Nair — Colorist</option>
                    <option value="Divya Pillai">Divya Pillai — Beautician</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="card" style={{ marginTop: '24px' }}>
              <h2 className="card-title">Available Time Slots</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '10px' }}>
                {slots.map(slot => {
                  const isTaken = takenSlots.includes(slot);
                  const isSelected = formData.time === slot;
                  return (
                    <div key={slot} onClick={() => !isTaken && setFormData({ ...formData, time: slot })}
                      style={{
                        border: `1.5px solid ${isSelected ? 'var(--gold)' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-sm)', padding: '12px 8px', textAlign: 'center', fontSize: '13px',
                        cursor: isTaken ? 'not-allowed' : 'pointer', background: isSelected ? 'var(--gold)' : 'var(--cream)',
                        color: isSelected ? '#fff' : isTaken ? 'var(--soft)' : 'var(--dark)', opacity: isTaken ? 0.4 : 1,
                        textDecoration: isTaken ? 'line-through' : 'none', fontWeight: isSelected ? '600' : '400',
                        boxShadow: isSelected ? 'var(--shadow-gold)' : 'none'
                      }}>
                      {slot}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="btn-row">
              <button className="btn btn-outline" onClick={handleBack}><ArrowLeft size={18} /> Back</button>
              <button className="btn btn-gold" onClick={handleNext} disabled={!formData.date || !formData.time}>Continue <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {/* STEP 3: Seat */}
        {step === 3 && (
          <div className="card fade-in">
            <h2 className="card-title">Choose Your Seat</h2>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--soft)', marginBottom: '12px', fontWeight: '600' }}>Styling Chairs (Ground Floor)</div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {stylingChairs.map(seat => {
                  const isOccupied = occupiedChairs.includes(seat);
                  const isSelected = formData.seat === seat;
                  return (
                    <div key={seat} onClick={() => !isOccupied && setFormData({ ...formData, seat })}
                      style={{
                        width: '50px', height: '50px', borderRadius: '8px', border: `1.5px solid ${isSelected ? 'var(--gold)' : isOccupied ? 'var(--border)' : 'var(--border)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isOccupied ? 'not-allowed' : 'pointer',
                        background: isSelected ? 'var(--gold)' : isOccupied ? 'var(--border)' : '#fff', color: isSelected ? '#fff' : isOccupied ? 'var(--soft)' : 'var(--dark)',
                        fontSize: '11px', fontWeight: '600', boxShadow: isSelected ? 'var(--shadow-gold)' : 'none'
                      }}>
                      {seat.split('-')[1]}
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--soft)', marginBottom: '12px', fontWeight: '600' }}>Spa Rooms (First Floor)</div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {spaRooms.map(seat => {
                  const isOccupied = occupiedChairs.includes(seat);
                  const isSelected = formData.seat === seat;
                  return (
                    <div key={seat} onClick={() => !isOccupied && setFormData({ ...formData, seat })}
                      style={{
                        width: '50px', height: '50px', borderRadius: '8px', border: `1.5px solid ${isSelected ? 'var(--gold)' : isOccupied ? 'var(--border)' : 'var(--border)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isOccupied ? 'not-allowed' : 'pointer',
                        background: isSelected ? 'var(--gold)' : isOccupied ? 'var(--border)' : '#fff', color: isSelected ? '#fff' : isOccupied ? 'var(--soft)' : 'var(--dark)',
                        fontSize: '11px', fontWeight: '600', boxShadow: isSelected ? 'var(--shadow-gold)' : 'none'
                      }}>
                      {seat.split('-')[1]}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="btn-row">
              <button className="btn btn-outline" onClick={handleBack}><ArrowLeft size={18} /> Back</button>
              <button className="btn btn-gold" onClick={handleNext} disabled={!formData.seat}>Continue <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {/* STEP 4: Details */}
        {step === 4 && (
          <div className="card fade-in">
            <h2 className="card-title">Your Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="Aarav" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Sharma" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 9876543210" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="aarav@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="form-group full">
                <label>Special Requests</label>
                <textarea rows="3" placeholder="Any allergies, preferences..." value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}></textarea>
              </div>
            </div>
            <div className="btn-row">
              <button className="btn btn-outline" onClick={handleBack}><ArrowLeft size={18} /> Back</button>
              <button className="btn btn-gold" onClick={handleNext} disabled={!formData.firstName || !formData.phone}>Review Booking <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {/* STEP 5: Confirm (Enhanced with Add-ons to Boost Sales) */}
        {step === 5 && (
          <div className="fade-in">
            <div className="card">
              <h2 className="card-title">Review & Confirm</h2>
              <div className="confirm-details-card" style={{ background: 'var(--charcoal)', borderRadius: 'var(--radius)', color: '#fff', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-dark)' }}>
                  <span style={{ color: '#999', display: 'block', marginBottom: '8px' }}>Services Selected</span>

                  {formData.selectedPackage ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600', color: 'var(--gold-light)' }}>👑 {formData.selectedPackage.name}</span>
                      <span>{formData.selectedPackage.price}</span>
                    </div>
                  ) : (
                    formData.services.map(s => (
                      <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '500' }}>{s.name}</span>
                        <span>{s.price}</span>
                      </div>
                    ))
                  )}

                  {/* Selected Add-ons */}
                  {formData.addOns.length > 0 && (
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--border-dark)' }}>
                      <span style={{ color: '#999', display: 'block', fontSize: '12px', marginBottom: '4px' }}>Add-ons Premium upgrades</span>
                      {formData.addOns.map(addon => (
                        <div key={addon.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', fontSize: '13px' }}>
                          <span style={{ color: 'var(--gold-light)' }}>✨ {addon.name}</span>
                          <span>{addon.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-dark)' }}>
                  <span style={{ color: '#999' }}>Date & Time</span>
                  <span style={{ fontWeight: '600' }}>{formData.date} at {formData.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-dark)' }}>
                  <span style={{ color: '#999' }}>Stylist</span>
                  <span style={{ fontWeight: '600' }}>{formData.stylist || 'Any Available'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-dark)' }}>
                  <span style={{ color: '#999' }}>Seat</span>
                  <span style={{ fontWeight: '600' }}>{formData.seat}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-dark)' }}>
                  <span style={{ color: '#999' }}>Details</span>
                  <span style={{ fontWeight: '600' }}>{formData.firstName} {formData.lastName} ({formData.phone})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 0 0', alignItems: 'center' }}>
                  <span style={{ color: '#999' }}>Total Estimated</span>
                  <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '28px', color: 'var(--gold)' }}>₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* ADD-ON UPSELLS (SALES BOOSTER) */}
            <div className="card" style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Sparkles size={20} className="text-gold" />
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '22px', margin: 0 }}>Elevate Your Appointment</h3>
              </div>
              <p style={{ color: 'var(--soft)', fontSize: '13px', marginBottom: '20px' }}>Add one of our high-margin pampering upgrades. Single click to add to your appointment!</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {addOns.map(addon => {
                  const isSelected = formData.addOns.some(a => a.name === addon.name);
                  return (
                    <div
                      key={addon.name}
                      onClick={() => toggleAddOn(addon)}
                      style={{
                        padding: '16px', borderRadius: 'var(--radius-sm)', border: `1.5px solid ${isSelected ? 'var(--gold)' : 'var(--border)'}`,
                        cursor: 'pointer', background: isSelected ? 'var(--success-bg)' : '#fff', transition: 'all 0.3s',
                        display: 'flex', alignItems: 'center', justifyContents: 'space-between', gap: '12px'
                      }}
                    >
                      <span style={{ fontSize: '24px' }}>{addon.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', color: 'var(--dark)', fontSize: '14px' }}>{addon.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--soft)' }}>{addon.price} · {addon.duration}</div>
                      </div>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        border: `1.5px solid ${isSelected ? 'var(--success)' : 'var(--border)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isSelected ? 'var(--success)' : 'transparent', color: '#fff'
                      }}>
                        {isSelected ? <Check size={12} /> : <Plus size={12} className="text-gold" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="btn-row">
              <button className="btn btn-outline" onClick={handleBack}><ArrowLeft size={18} /> Edit Details</button>
              <button className="btn btn-gold" onClick={submitBooking}>Confirm Booking ✓</button>
            </div>
          </div>
        )}

        {/* STEP 6: Success */}
        {step === 6 && (
          <div className="card fade-in" style={{ textAlign: 'center', padding: '60px 2rem' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '40px', color: 'var(--dark)', marginBottom: '16px' }}>Booking Submitted!</h2>
            <p style={{ color: 'var(--soft)', fontSize: '16px', maxWidth: '400px', margin: '0 auto 32px' }}>Your appointment request has been sent. You'll receive a confirmation once approved.</p>
            <div style={{ display: 'inline-block', background: 'var(--pending-bg)', border: '1px solid var(--gold-light)', padding: '10px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: '600', color: 'var(--pending)', letterSpacing: '1px', marginBottom: '32px' }}>
              REF: {bookingRef}
            </div>
            <br />
            <button className="btn btn-outline" onClick={() => { setStep(1); setFormData({ services: [], selectedPackage: null, addOns: [], time: '', seat: '' }); }}>Book Another Appointment</button>
          </div>
        )}
      </div>

      {/* FEEDBACK PORTAL MODAL */}
      {showFeedbackModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '20px'
        }}>
          <div className="card fade-in" style={{ width: '100%', maxWidth: '500px', margin: 0, position: 'relative' }}>
            <button
              onClick={() => setShowFeedbackModal(false)}
              style={{
                position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none',
                fontSize: '20px', cursor: 'pointer', color: 'var(--soft)'
              }}
            >
              ✕
            </button>

            {feedbackSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💖</div>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '28px', color: 'var(--success)', marginBottom: '8px' }}>Thank You!</h3>
                <p style={{ color: 'var(--soft)' }}>Your valuable feedback helps us improve our luxury salon experience.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit}>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '28px', marginBottom: '8px' }}>How was your last visit?</h3>
                <p style={{ color: 'var(--soft)', marginBottom: '24px', fontSize: '13px' }}>Tell us about your experience to help us address any issues and maximize quality.</p>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Aarav Sharma"
                    value={feedbackForm.customerName}
                    onChange={e => setFeedbackForm({ ...feedbackForm, customerName: e.target.value })}
                  />
                </div>

                <div className="form-grid" style={{ marginBottom: '16px' }}>
                  <div className="form-group">
                    <label>Service Received</label>
                    <select
                      value={feedbackForm.service}
                      onChange={e => setFeedbackForm({ ...feedbackForm, service: e.target.value })}
                    >
                      {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Stylist Who Served</label>
                    <select
                      value={feedbackForm.stylist}
                      onChange={e => setFeedbackForm({ ...feedbackForm, stylist: e.target.value })}
                    >
                      <option value="Priya Sharma">Priya Sharma</option>
                      <option value="Rahul Mehta">Rahul Mehta</option>
                      <option value="Ananya Das">Ananya Das</option>
                      <option value="Karan Nair">Karan Nair</option>
                      <option value="Divya Pillai">Divya Pillai</option>
                    </select>
                  </div>
                </div>

                {/* Star Rating Select */}
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label>Experience Rating</label>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    {[1, 2, 3, 4, 5].map(stars => (
                      <Star
                        key={stars}
                        size={28}
                        onClick={() => setFeedbackForm({ ...feedbackForm, rating: stars })}
                        style={{
                          cursor: 'pointer',
                          fill: stars <= feedbackForm.rating ? 'var(--gold)' : 'none',
                          stroke: stars <= feedbackForm.rating ? 'var(--gold)' : 'var(--soft)',
                          transition: 'all 0.2s'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Dynamic dissatisfaction collector (Crucial to find LACKS) */}
                {feedbackForm.rating <= 3 && (
                  <div style={{
                    background: 'var(--danger-bg)', border: '1px solid #f0bcbc', borderRadius: 'var(--radius-sm)',
                    padding: '16px', marginBottom: '20px', animation: 'fadeIn 0.3s ease'
                  }}>
                    <label style={{ color: 'var(--danger)', display: 'block', marginBottom: '8px', fontSize: '12px' }}>
                      ⚠️ What can we improve? (Select all that apply)
                    </label>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {['Wait Time', 'Service Quality', 'Pricing', 'Hygiene'].map(issue => {
                        const isChecked = feedbackForm.issues.includes(issue);
                        return (
                          <div
                            key={issue}
                            onClick={() => toggleFeedbackIssue(issue)}
                            style={{
                              padding: '6px 12px', borderRadius: '4px', border: '1px solid', fontSize: '11px', fontWeight: '700', cursor: 'pointer',
                              borderColor: isChecked ? 'var(--danger)' : 'var(--border)',
                              background: isChecked ? 'var(--danger)' : '#fff',
                              color: isChecked ? '#fff' : 'var(--soft)',
                              transition: 'all 0.2s'
                            }}
                          >
                            {issue}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label>Comments / Suggestions</label>
                  <textarea
                    rows="3"
                    placeholder="Tell us what you liked or what we can fix..."
                    value={feedbackForm.comment}
                    onChange={e => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM CHECKOUT BAR */}
      {step === 1 && (formData.services.length > 0 || formData.selectedPackage) && (
        <div className="mobile-sticky-checkout-bar">
          <div className="mobile-checkout-info">
            <span className="mobile-checkout-label">Total Subtotal</span>
            <strong className="mobile-checkout-price">₹{calculateTotal().toLocaleString()}</strong>
            <span className="mobile-checkout-count">
              {formData.selectedPackage ? '1 Package' : `${formData.services.length} Service${formData.services.length > 1 ? 's' : ''}`}
            </span>
          </div>
          <button className="btn btn-gold mobile-checkout-btn" onClick={handleNext}>
            Continue <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
