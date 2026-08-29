"use client";
import React, { useState } from "react";
import { FaChevronDown, FaFile, FaHandshake, FaTree } from "react-icons/fa6";
import { useModal } from "../Components/Modal/ModalContext";
import Footer from "../Components/Extras/footer";

type Plan = "yearly" | "monthly";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "How does the free 7-day trial work?",
    answer:
      "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
  },
  {
    question:
      "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
    answer:
      "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
  },
  {
    question: "What's included in the Premium plan?",
    answer:
      "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
  },
  {
    question: "Can I cancel during my trial or subscription?",
    answer:
      "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
  },
];

export default function sale() {
  const { openLogin, user } = useModal();
  const [selectedPlan, setSelectedPlan] = useState<Plan>("yearly");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isYearly = selectedPlan === "yearly";

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="salePageWrapper">
      <div className="salePageHeader">
        <h1 className="salePageTitle">
          Get Unlimited access to many amazing <br />
          books to read
        </h1>
        <p className="salePageSubtitle">
          Turn ordinary moments into amazing learning opportunities
        </p>
        <img src="/pricing-top.png" alt="" className="saleImg" />
      </div>
      <div className="salePageIdeas">
        <div className="salePageIdea">
          <FaFile size={50} color="#032b41" />
          <p className="salePageIdeaTxt">
            <span className="salePageBoldTxt">Key ideas in a few minutes</span>{" "}
            with many <br /> books to read
          </p>
        </div>
        <div className="salePageIdea">
          <FaTree size={50} color="#032b41" />
          <p className="salePageIdeaTxt">
            <span className="salePageBoldTxt">3 million</span> people growing
            with <br /> Summarist everyday
          </p>
        </div>
        <div className="salePageIdea">
          <FaHandshake size={50} color="#032b41" />
          <p className="salePageIdeaTxt">
            <span className="salePageBoldTxt">Precise recommendations</span>
            <br /> collections curated by experts
          </p>
        </div>
      </div>
      <div className="salePagePlan">
        <h1 className="salePagePlanTitle">Choose the plan that fits you</h1>
        <button
          className={`saleBox plusSaleBox ${isYearly ? "saleBox--active" : ""}`}
          onClick={() => setSelectedPlan("yearly")}
        >
          <div className="saleBoxCircle">
            {isYearly && <div className="saleBoxDot" />}
          </div>
          <div className="saleBoxContent">
            <p className="saleBoxTitle">Premium Plus Yearly</p>
            <p className="saleBoxPrice">$99.99/year</p>
            <p className="saleBoxTrial">7-day free trial included</p>
          </div>
        </button>
        <div className="orSection">
          <div className="separator"></div>
          <p>or</p>
          <div className="separator"></div>
        </div>
        <button
          className={`saleBox monthSaleBox ${!isYearly ? "saleBox--active" : ""}`}
          onClick={() => setSelectedPlan("monthly")}
        >
          <div className="saleBoxCircle">
            {!isYearly && <div className="saleBoxDot" />}
          </div>
          <div className="saleBoxContent">
            <p className="saleBoxTitle">Premium Monthly</p>
            <p className="saleBoxPrice">$9.99/month</p>
            <p className="saleBoxTrial">No trial included</p>
          </div>
        </button>
        <div className="saleBoxBtn">
          <button onClick={openLogin} className="btn">
            {isYearly
              ? "Start your free 7-day trial"
              : "Start your first month"}
          </button>
        </div>
        <p className="saleBoxTxt">
          {isYearly
            ? "Cancel your trial at any time before it ends and you wont be charged"
            : "30-day money back guarantee no questions asked"}
        </p>
      </div>
      <div className="salePageAccordion">
        {faqItems.map((item, index) => (
          <div key={index} className="accordionItem">
            <button
              className="accordionHeader"
              onClick={() => toggleFaq(index)}
            >
              <span className="accordionQuestion">{item.question}</span>
              <FaChevronDown
                className={`accordionChevron ${openIndex === index ? "accordionChevron--open" : ""}`}
                size={16}
              />
            </button>
            <div
              className={`accordionBody ${openIndex === index ? "accordionBody--open" : ""}`}
            >
              <p className="accordionAnswer">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
