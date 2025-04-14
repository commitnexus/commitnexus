import React, { useState } from 'react';
import './FAQ.css';
import Head from '../homepage/header';
import Footer from '../homepage/footer';

const faqs = [
    {
      question: 'What is CommitNexus?',
      answer: 'CommitNexus is a platform for seamless data sharing, AI-powered file management, and secure cloud storage.',
    },
    {
      question: 'How can I share files?',
      answer: 'You can upload files and share them using a 4-digit code, URL, or QR code instantly.',
    },
    {
      question: 'Is my data safe?',
      answer: 'Absolutely. We use encryption and secure cloud storage to keep your data protected.',
    },
    {
      question: 'What is AI File Restoration?',
      answer: 'Our AI automatically restores accidentally deleted or disorganized files by analyzing usage and structure patterns.',
    },
    {
      question: 'Do I need an account to use CommitNexus?',
      answer: 'Nope! You can start sharing files instantly without creating an account.',
    },
    {
      question: 'Can I organize my files in folders?',
      answer: 'Yes, CommitNexus allows you to organize your uploaded files into folders for easier access and management.',
    },
    {
      question: 'How long are my files stored?',
      answer: 'Files are securely stored in the cloud. You can choose how long they remain available based on your preferences.',
    },
    {
      question: 'Is there a file size limit?',
      answer: 'Yes, the maximum file upload size depends on your plan. Free users have a smaller limit compared to premium users.',
    },
    {
      question: 'Can I access my files from any device?',
      answer: 'Absolutely. As long as you have internet access and the file code or link, you can retrieve your files on any device.',
    },
    {
      question: 'Does CommitNexus work on mobile?',
      answer: 'Yes, our platform is fully responsive and works seamlessly on all mobile browsers.',
    },
    {
      question: 'Can I preview files before downloading?',
      answer: 'Yes, CommitNexus supports file previews for popular formats like images, PDFs, and text documents.',
    },
    {
      question: 'Do you offer customer support?',
      answer: 'Yes! You can reach out via our Contact page or email us for technical or general support queries.',
    },
    {
      question: 'Can I upgrade my storage plan?',
      answer: 'Yes, visit the Pricing page to view premium options and upgrade your storage and feature access.',
    },
    {
      question: 'Is CommitNexus suitable for teams?',
      answer: 'Definitely. We’re working on a multi-user workspace feature to support teams and collaboration.',
    },
    {
      question: 'How do I delete my uploaded files?',
      answer: 'Each file/folder includes a delete option. Deletion requires your access code or QR-based confirmation.',
    }
  ];
  

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
    <Head/>
        <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default FAQ;
