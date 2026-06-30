import React from 'react';

export default function DmcaPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 font-mono text-[#EAEAEA]">
      <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.01em] text-[#00F0FF] mb-8">
        DMCA Notice
      </h1>
      <p className="text-sm text-[#888888] mb-12">LAST UPDATED: 2026-06-29</p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            Copyright Infringement Notification
          </h2>
          <p>
            We take intellectual property rights very seriously. If you believe that any material on our site violates your copyright, you may submit a formal takedown notice under the Digital Millennium Copyright Act (DMCA).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            Required Notice Elements
          </h2>
          <p>
            To be valid, your notification must include:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-sm text-[#888888]">
            <li>An electronic or physical signature of the person authorized to act on behalf of the copyright owner.</li>
            <li>A description of the copyrighted work that you claim has been infringed.</li>
            <li>A description of the material that you claim is infringing and where it is located on our website.</li>
            <li>Your contact information (address, phone number, and email).</li>
            <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement, made under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on their behalf.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#FFD700] mb-4">
            Submitting Your Notice
          </h2>
          <p>
            Please transmit all notices directly to our designated copyright agent via email at: <a href="mailto:dmca@nyxeltechnologies.com" className="text-[#00F0FF] hover:underline">dmca@nyxeltechnologies.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
