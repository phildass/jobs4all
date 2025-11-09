import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function PaymentPage() {
  const [applicationId, setApplicationId] = useState('');
  const [jobCount, setJobCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAppId = sessionStorage.getItem('applicationId');
    const storedJobCount = sessionStorage.getItem('jobCount');

    if (!storedAppId || !storedJobCount) {
      navigate('/search');
      return;
    }

    setApplicationId(storedAppId);
    setJobCount(parseInt(storedJobCount));
  }, [navigate]);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Create payment order
      const orderResponse = await axios.post(`${API_URL}/api/create-payment`, {
        amount: 100,
        applicationId
      });

      const order = orderResponse.data;

      // In a real implementation, this would integrate with Razorpay
      // For demo purposes, we'll simulate a successful payment
      
      // Mock Razorpay integration
      const options = {
        key: 'rzp_test_demo', // This would be your actual Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: 'Jobs4All',
        description: 'Job Application Fee',
        order_id: order.id,
        handler: async function (response) {
          // Verify payment
          const verifyResponse = await axios.post(`${API_URL}/api/verify-payment`, {
            orderId: order.id,
            paymentId: response.razorpay_payment_id || 'demo_payment_id',
            signature: response.razorpay_signature || 'demo_signature'
          });

          if (verifyResponse.data.success) {
            setPaymentSuccess(true);
            setTimeout(() => {
              // Clear session storage
              sessionStorage.clear();
            }, 3000);
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#667eea'
        }
      };

      // In production, you would load Razorpay SDK and use:
      // const razorpay = new window.Razorpay(options);
      // razorpay.open();
      
      // For demo, simulate successful payment after 2 seconds
      setTimeout(() => {
        setPaymentSuccess(true);
        setLoading(false);
        setTimeout(() => {
          sessionStorage.clear();
        }, 3000);
      }, 2000);

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  const handlePaymentDemo = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
      setLoading(false);
      
      // Clear session after showing success
      setTimeout(() => {
        sessionStorage.clear();
      }, 3000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h1>Payment Successful!</h1>
            <p>Your application has been submitted successfully.</p>
            <div className="success-details">
              <p>Application ID: <strong>{applicationId}</strong></p>
              <p>Jobs Applied: <strong>{jobCount}</strong></p>
              <p>Amount Paid: <strong>₹100</strong></p>
            </div>
            <p className="success-note">
              Your applications have been sent to all selected employers.
              You will receive email confirmations shortly.
            </p>
            <button onClick={() => navigate('/')} className="home-btn">
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <h1>Complete Your Payment</h1>
          <p>Finalize your job applications</p>
        </div>

        <div className="payment-details">
          <div className="detail-row">
            <span>Application ID:</span>
            <strong>{applicationId}</strong>
          </div>
          <div className="detail-row">
            <span>Number of Jobs:</span>
            <strong>{jobCount}</strong>
          </div>
          <div className="detail-row total">
            <span>Total Amount:</span>
            <strong>₹100</strong>
          </div>
        </div>

        <div className="payment-info">
          <h3>What's Included:</h3>
          <ul>
            <li>✓ Application sent to {jobCount} employer{jobCount > 1 ? 's' : ''}</li>
            <li>✓ Resume and profile submission</li>
            <li>✓ Direct contact with hiring managers</li>
            <li>✓ Application tracking and updates</li>
          </ul>
        </div>

        <div className="payment-methods">
          <h3>Payment Method:</h3>
          <div className="method-info">
            <span className="upi-icon">💳</span>
            <span>UPI / Razorpay</span>
          </div>
        </div>

        <button 
          onClick={handlePaymentDemo} 
          className="pay-btn"
          disabled={loading}
        >
          {loading ? 'Processing Payment...' : 'Pay ₹100 Now'}
        </button>

        <p className="security-note">
          🔒 Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  );
}

export default PaymentPage;
