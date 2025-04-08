import React, { useState } from "react";
import './FAQ.css';


const faqs = [
  {
    question: "What is CommitNexus?",
    answer:
      "CommitNexus is a smart platform for seamless file sharing, AI-powered file management, and secure cloud storage.",
  },
  {
    question: "Do I need to sign up to use CommitNexus?",
    answer:
      "Nope! You can upload and share files instantly without signing up. Just visit commitnexus.xyz and get started.",
  },
  {
    question: "How do I share files with someone?",
    answer:
      "After uploading your file, you’ll get a 4-digit code and a QR code. Share either one with your recipient to download the file.",
  },
  {
    question: "Is CommitNexus free to use?",
    answer:
      "Yes! Core features like file sharing and downloading via code or QR are absolutely free to use.",
  },
  {
    question: "How long are my files stored?",
    answer:
      "Files are stored for a limited time (e.g., 24 hours) or until downloaded. This ensures both privacy and efficient storage.",
  },
  {
    question: "What is AI file restoration?",
    answer:
      "Our AI can auto-restore corrupted files, sort uploads by type, and help organize your files intelligently.",
  },
  {
    question: "Is my data safe on CommitNexus?",
    answer:
      "Yes. We use end-to-end encryption and secure infrastructure to protect your data from unauthorized access.",
  },
  {
    question: "Can I use CommitNexus on mobile?",
    answer:
      "Absolutely! CommitNexus is fully mobile-friendly. Upload, share, and download from any smartphone or tablet.",
  },
  {
    question: "What file types are supported?",
    answer:
      "You can upload all common file types — images, videos, documents, ZIPs, and more (subject to size limits).",
  },
  {
    question: "What happens if I lose my 4-digit code?",
    answer:
      "The code is required to access your file. If it’s lost, you’ll need to re-upload and generate a new one.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
  <h2 className="faq-heading">Frequently Asked Questions</h2>
  <div className="faq-list">
    {faqs.map((faq, index) => (
      <div key={index} className="faq-item">
        <button className="faq-question" onClick={() => toggleFAQ(index)}>
          {faq.question}
        </button>
        {openIndex === index && (
          <p className="faq-answer">{faq.answer}</p>
        )}
      </div>
    ))}
  </div>
</div>

  );
};

export default FAQ;
