import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [bookings, setBookings] = useState([
    { id: 'LUM-1001', name: 'Meera Iyer', phone: '+91 9812345678', email: 'meera@email.com', service: 'Facial Treatment', date: '2025-07-18', time: '10:00 AM', seat: 'SPA-2', stylist: 'Ananya Das', status: 'pending', notes: 'Sensitive skin' },
    { id: 'LUM-1002', name: 'Raj Kumar', phone: '+91 9823456789', email: 'raj@email.com', service: 'Haircut & Styling', date: '2025-07-18', time: '11:30 AM', seat: 'Chair-3', stylist: 'Rahul Mehta', status: 'approved', notes: '' },
    { id: 'LUM-1003', name: 'Sneha Patel', phone: '+91 9834567890', email: 'sneha@email.com', service: 'Spa & Massage', date: '2025-07-19', time: '2:00 PM', seat: 'SPA-1', stylist: 'Ananya Das', status: 'pending', notes: 'First visit' },
    { id: 'LUM-1004', name: 'Arjun Singh', phone: '+91 9845678901', email: 'arjun@email.com', service: 'Beard Grooming', date: '2025-07-17', time: '3:00 PM', seat: 'Chair-5', stylist: 'Karan Nair', status: 'completed', notes: '' },
    { id: 'LUM-1005', name: 'Pooja Reddy', phone: '+91 9856789012', email: 'pooja@email.com', service: 'Hair Color', date: '2025-07-20', time: '10:00 AM', seat: 'Chair-1', stylist: 'Priya Sharma', status: 'pending', notes: 'Wants highlights' },
    { id: 'LUM-1006', name: 'Vikram Joshi', phone: '+91 9867890123', email: 'vikram@email.com', service: 'Haircut & Styling', date: '2025-07-16', time: '4:00 PM', seat: 'Chair-2', stylist: 'Priya Sharma', status: 'approved', notes: '' },
    { id: 'LUM-1007', name: 'Kavya Nair', phone: '+91 9878901234', email: 'kavya@email.com', service: 'Manicure & Pedicure', date: '2025-07-21', time: '1:00 PM', seat: 'SPA-3', stylist: 'Divya Pillai', status: 'rejected', notes: '' },
  ]);

  const [customersList, setCustomersList] = useState([
    { id: 'C-001', name: 'Meera Iyer', phone: '+91 9812345678', email: 'meera@email.com', totalVisits: 14, totalSpent: 28500, lastVisit: '2025-06-15' },
    { id: 'C-002', name: 'Raj Kumar', phone: '+91 9823456789', email: 'raj@email.com', totalVisits: 8, totalSpent: 9200, lastVisit: '2025-06-28' },
    { id: 'C-003', name: 'Sneha Patel', phone: '+91 9834567890', email: 'sneha@email.com', totalVisits: 1, totalSpent: 2000, lastVisit: '2025-07-10' },
    { id: 'C-004', name: 'Arjun Singh', phone: '+91 9845678901', email: 'arjun@email.com', totalVisits: 3, totalSpent: 4500, lastVisit: '2025-03-12' },
    { id: 'C-005', name: 'Pooja Reddy', phone: '+91 9856789012', email: 'pooja@email.com', totalVisits: 2, totalSpent: 3000, lastVisit: '2025-01-05' },
    { id: 'C-006', name: 'Vikram Joshi', phone: '+91 9867890123', email: 'vikram@email.com', totalVisits: 22, totalSpent: 41000, lastVisit: '2025-07-01' },
    { id: 'C-007', name: 'Kavya Nair', phone: '+91 9878901234', email: 'kavya@email.com', totalVisits: 1, totalSpent: 900, lastVisit: '2025-07-15' },
  ]);

  const [feedbacks, setFeedbacks] = useState([
    { id: 'F-101', customerName: 'Arjun Singh', rating: 2, service: 'Beard Grooming', stylist: 'Karan Nair', comment: 'Stylist was very rushed and didn\'t trim evenly. Wait time was 25 minutes after my slot.', issues: ['Wait Time', 'Service Quality'], date: '2025-07-17' },
    { id: 'F-102', customerName: 'Pooja Reddy', rating: 3, service: 'Hair Color', stylist: 'Priya Sharma', comment: 'Loved the highlights but the pricing was much higher than quoted online.', issues: ['Pricing'], date: '2025-07-20' },
    { id: 'F-103', customerName: 'Meera Iyer', rating: 5, service: 'Facial Treatment', stylist: 'Ananya Das', comment: 'Absolutely amazing! Best spa day ever, very relaxing.', issues: [], date: '2025-07-18' },
    { id: 'F-104', customerName: 'Raj Kumar', rating: 5, service: 'Haircut & Styling', stylist: 'Rahul Mehta', comment: 'Great haircut, precise and stylish. Rahul is fantastic!', issues: [], date: '2025-07-18' }
  ]);

  const [promosSent, setPromosSent] = useState([]);

  const [services, setServices] = useState([
    { name: 'Haircut & Styling', price: '₹800', duration: '45 min', category: 'Unisex', img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=75', icon: '✂️' },
    { name: 'Facial Treatment', price: '₹1,200', duration: '60 min', category: 'Unisex', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=75', icon: '🧖' },
    { name: 'Spa & Massage', price: '₹2,000', duration: '90 min', category: 'Women', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=75', icon: '💆' },
    { name: 'Hair Color', price: '₹1,500', duration: '120 min', category: 'Unisex', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=75', icon: '🎨' },
    { name: 'Beard Grooming', price: '₹500', duration: '30 min', category: 'Men', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=75', icon: '🪒' },
    { name: 'Manicure & Pedicure', price: '₹900', duration: '75 min', category: 'Women', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=75', icon: '💅' },
    { name: 'Kids Haircut', price: '₹400', duration: '30 min', category: 'Unisex', img: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=400&q=75', icon: '👶' },
    { name: 'Bridal Package', price: '₹8,000', duration: '4 hrs', category: 'Women', img: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=400&q=75', icon: '👰' },
  ]);

  const addService = (newService) => {
    setServices([...services, newService]);
  };

  const editServicePrice = (name, newPrice) => {
    setServices(services.map(s => s.name === name ? { ...s, price: newPrice.startsWith('₹') ? newPrice : `₹${newPrice}` } : s));
  };

  const addBooking = (bookingData) => {
    const newBooking = {
      id: `LUM-${1000 + bookings.length + 1}`,
      status: 'pending',
      ...bookingData
    };
    setBookings([newBooking, ...bookings]);

    // Add or update customer in list
    const existing = customersList.find(c => c.phone === bookingData.phone || c.email === bookingData.email);
    if (existing) {
      setCustomersList(customersList.map(c =>
        c.id === existing.id
          ? { ...c, totalVisits: c.totalVisits + 1, totalSpent: c.totalSpent + 1000, lastVisit: bookingData.date }
          : c
      ));
    } else {
      const newCust = {
        id: `C-00${customersList.length + 1}`,
        name: bookingData.name,
        phone: bookingData.phone,
        email: bookingData.email,
        totalVisits: 1,
        totalSpent: 1000,
        lastVisit: bookingData.date
      };
      setCustomersList([...customersList, newCust]);
    }
    return newBooking;
  };

  const updateBookingStatus = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const addFeedback = (feedbackData) => {
    const newFeedback = {
      id: `F-${100 + feedbacks.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      ...feedbackData
    };
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  const sendCustomPromo = (customerId, discount, message) => {
    const newPromo = {
      id: `P-${Date.now()}`,
      customerId,
      discount,
      message,
      sentAt: new Date().toISOString().split('T')[0]
    };
    setPromosSent([newPromo, ...promosSent]);
  };

  const getDaysSinceLastVisit = (lastVisitDate) => {
    const today = new Date('2025-07-22'); // simulated date
    const lastVisit = new Date(lastVisitDate);
    const diffTime = today - lastVisit;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) ? 0 : diffDays;
  };

  const getComputedCustomers = () => {
    return customersList.map(c => {
      const days = getDaysSinceLastVisit(c.lastVisit);
      let status = 'New';
      if (days > 45) {
        status = 'Likely to Lose';
      } else if (c.totalVisits >= 5) {
        status = 'Monthly Regular';
      } else if (c.totalVisits === 1) {
        status = 'First Time';
      } else {
        status = 'Active';
      }
      return { ...c, daysSinceLastVisit: days, status };
    });
  };

  const packages = [
    { name: 'Royal Glow Combo', services: ['Facial Treatment', 'Manicure & Pedicure'], price: '₹1,800', duration: '135 min', savings: 'Save ₹300', description: 'Ultimate rejuvenation with our premium facial and detailed manicure/pedicure.', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=75', icon: '👑' },
    { name: 'Signature Hair Makeover', services: ['Haircut & Styling', 'Hair Color'], price: '₹2,000', duration: '165 min', savings: 'Save ₹300', description: 'Complete style transformation with custom cut and premium hair highlights.', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=75', icon: '💇' }
  ];

  const addOns = [
    { name: 'Deep Conditioning Mask', price: '₹300', duration: '15 min', icon: '🧴' },
    { name: 'Aromatherapy Essential Oils', price: '₹200', duration: '10 min', icon: '🌿' },
    { name: 'Premium Shine Polish', price: '₹150', duration: '10 min', icon: '✨' }
  ];

  const staff = [
    { name: 'Priya Sharma', speciality: 'Senior Stylist' },
    { name: 'Rahul Mehta', speciality: 'Hair Expert' },
    { name: 'Ananya Das', speciality: 'Spa Specialist' },
    { name: 'Karan Nair', speciality: 'Colorist' },
    { name: 'Divya Pillai', speciality: 'Beautician' },
  ];

  return (
    <BookingContext.Provider value={{
      bookings,
      addBooking,
      updateBookingStatus,
      services,
      packages,
      addOns,
      staff,
      customers: getComputedCustomers(),
      feedbacks,
      addFeedback,
      promosSent,
      sendCustomPromo,
      isAdminLoggedIn,
      setIsAdminLoggedIn,
      addService,
      editServicePrice
    }}>
      {children}
    </BookingContext.Provider>
  );
};
