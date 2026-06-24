/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import RealtorCard from './components/RealtorCard';

export default function App() {
  return (
    <main id="app-container" className="relative min-h-screen bg-[#070b13] overflow-x-hidden selection:bg-[#c9a84c]/30 selection:text-[#f0d078]">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#070b13] to-black pointer-events-none" />
      
      {/* Subtle Grid overlay for real estate / planning architectural feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Main card view */}
      <RealtorCard />
    </main>
  );
}

