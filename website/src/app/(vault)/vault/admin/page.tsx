'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Terminal, Shield, FileText, Users, Mail, Plus, Trash2, 
  Edit3, LogOut, LayoutDashboard, ChevronRight, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'roster' | 'leads'>('projects');
  
  // Data States
  const [projects, setProjects] = useState<any[]>([]);
  const [roster, setRoster] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form States - Projects
  const [projForm, setProjForm] = useState({
    codename: '',
    industry: '',
    stack: '',
    scale: '',
    problem: '',
    solution: '',
    result: '',
    ipfsCid: ''
  });
  const [editingProj, setEditingProj] = useState<string | null>(null);

  // Form States - Roster
  const [rostForm, setRostForm] = useState({
    handle: '',
    role: '',
    experience: '',
    stack: '',
    timezone: ''
  });
  const [editingRost, setEditingRost] = useState<string | null>(null);

  // Load All Data
  const loadData = async () => {
    setLoading(true);
    try {
      const [projRes, rostRes, leadsRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/roster'),
        fetch('/api/admin/leads')
      ]);

      if (projRes.status === 403 || rostRes.status === 403 || leadsRes.status === 403) {
        // Not admin session
        router.push('/vault');
        return;
      }

      const projData = await projRes.json();
      const rostData = await rostRes.json();
      const leadsData = await leadsRes.json();

      if (projData.success) setProjects(projData.data);
      if (rostData.success) setRoster(rostData.data);
      if (leadsData.success) setLeads(leadsData.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      showFeedback('error', 'Failed to connect to database REST services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 5000);
  };

  const handleLogout = async () => {
    try {
      await fetch('/logout', { method: 'POST' });
      router.push('/vault');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // CRUD - Projects
  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProj ? 'PUT' : 'POST';
    try {
      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projForm)
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
        showFeedback('success', `Project successfully ${editingProj ? 'updated' : 'created'}!`);
        resetProjForm();
      } else {
        showFeedback('error', data.error || 'Failed to save project.');
      }
    } catch (err) {
      showFeedback('error', 'Network error while saving project.');
    }
  };

  const editProject = (p: any) => {
    setEditingProj(p.codename);
    setProjForm({
      codename: p.codename,
      industry: p.industry,
      stack: Array.isArray(p.stack) ? p.stack.join(', ') : p.stack,
      scale: p.scale,
      problem: p.problem,
      solution: p.solution,
      result: p.result,
      ipfsCid: p.ipfsCid || ''
    });
  };

  const deleteProject = async (codename: string) => {
    if (!confirm(`Purge case study "${codename}"? This action is permanent.`)) return;
    try {
      const res = await fetch(`/api/admin/projects?codename=${encodeURIComponent(codename)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
        showFeedback('success', 'Project purged from archive.');
      } else {
        showFeedback('error', data.error || 'Failed to delete project.');
      }
    } catch (err) {
      showFeedback('error', 'Network error deleting project.');
    }
  };

  const resetProjForm = () => {
    setEditingProj(null);
    setProjForm({
      codename: '',
      industry: '',
      stack: '',
      scale: '',
      problem: '',
      solution: '',
      result: '',
      ipfsCid: ''
    });
  };

  // CRUD - Roster
  const saveRoster = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingRost ? 'PUT' : 'POST';
    try {
      const res = await fetch('/api/admin/roster', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rostForm)
      });
      const data = await res.json();
      if (data.success) {
        setRoster(data.data);
        showFeedback('success', `Roster member ${editingRost ? 'updated' : 'added'} successfully!`);
        resetRostForm();
      } else {
        showFeedback('error', data.error || 'Failed to save roster member.');
      }
    } catch (err) {
      showFeedback('error', 'Network error saving roster.');
    }
  };

  const editRoster = (r: any) => {
    setEditingRost(r.handle);
    setRostForm({
      handle: r.handle,
      role: r.role,
      experience: r.experience,
      stack: Array.isArray(r.stack) ? r.stack.join(', ') : r.stack,
      timezone: r.timezone
    });
  };

  const deleteRoster = async (handle: string) => {
    if (!confirm(`Remove "${handle}" from the roster?`)) return;
    try {
      const res = await fetch(`/api/admin/roster?handle=${encodeURIComponent(handle)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setRoster(data.data);
        showFeedback('success', 'Roster member deallocated.');
      } else {
        showFeedback('error', data.error || 'Failed to remove member.');
      }
    } catch (err) {
      showFeedback('error', 'Network error removing roster member.');
    }
  };

  const resetRostForm = () => {
    setEditingRost(null);
    setRostForm({
      handle: '',
      role: '',
      experience: '',
      stack: '',
      timezone: ''
    });
  };

  // CRUD - Leads
  const purgeLead = async (timestamp: number) => {
    if (!confirm('Purge client brief and NDA state? This clears details from memory.')) return;
    try {
      const res = await fetch(`/api/admin/leads?timestamp=${timestamp}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
        showFeedback('success', 'Lead record shredded.');
      } else {
        showFeedback('error', data.error || 'Failed to shred lead record.');
      }
    } catch (err) {
      showFeedback('error', 'Network error shredding lead.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-mono text-[#EAEAEA] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Terminal Header */}
        <div className="border border-[#2A2A2A] bg-[#121212] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-8 h-8 text-[#FF4500] animate-pulse" />
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#FF4500]">NXC ✦ ADMIN CONSOLE</h1>
              <p className="text-xs text-[#888888]">Session Mode: Authorized Root Operator</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Link href="/vault/dashboard">
              <Button variant="ghost" size="sm">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Vault Dashboard
              </Button>
            </Link>
            <Button variant="danger" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Destroy Session
            </Button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-4 flex items-center gap-3 border ${
            feedback.type === 'success' ? 'bg-green-950/20 border-green-800 text-green-400' : 'bg-red-950/20 border-red-800 text-red-400'
          }`}>
            {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm">{feedback.message}</span>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex border-b border-[#2A2A2A]">
          <button 
            className={`py-3 px-6 flex items-center gap-2 border-b-2 text-sm transition-all ${
              activeTab === 'projects' ? 'border-[#FF4500] text-[#FF4500] bg-[#121212]/50' : 'border-transparent text-[#888888] hover:text-[#EAEAEA]'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            <FileText className="w-4 h-4" />
            Case Studies ({projects.length})
          </button>
          <button 
            className={`py-3 px-6 flex items-center gap-2 border-b-2 text-sm transition-all ${
              activeTab === 'roster' ? 'border-[#FF4500] text-[#FF4500] bg-[#121212]/50' : 'border-transparent text-[#888888] hover:text-[#EAEAEA]'
            }`}
            onClick={() => setActiveTab('roster')}
          >
            <Users className="w-4 h-4" />
            Engine Roster ({roster.length})
          </button>
          <button 
            className={`py-3 px-6 flex items-center gap-2 border-b-2 text-sm transition-all ${
              activeTab === 'leads' ? 'border-[#FF4500] text-[#FF4500] bg-[#121212]/50' : 'border-transparent text-[#888888] hover:text-[#EAEAEA]'
            }`}
            onClick={() => setActiveTab('leads')}
          >
            <Mail className="w-4 h-4" />
            Inbound Leads ({leads.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#888888] animate-pulse">
            <Terminal className="w-8 h-8 mx-auto mb-3 animate-spin" />
            <span>Connecting to database registry...</span>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* PROJECTS PANEL */}
            {activeTab === 'projects' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Form Column */}
                <div className="lg:col-span-1 space-y-4">
                  <Card className="p-6 border-2 border-[#FF4500]/50 bg-[#121212]/90">
                    <h3 className="font-serif text-lg font-bold text-[#EAEAEA] mb-4 flex items-center justify-between">
                      <span>{editingProj ? 'EDIT CASE STUDY' : 'NEW CASE STUDY'}</span>
                      {editingProj && (
                        <button onClick={resetProjForm} className="text-xs text-red-500 hover:underline">Cancel</button>
                      )}
                    </h3>
                    
                    <form onSubmit={saveProject} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-[#888888] mb-1 uppercase tracking-wider">Codename *</label>
                        <Input 
                          value={projForm.codename}
                          onChange={(e) => setProjForm({ ...projForm, codename: e.target.value })}
                          disabled={!!editingProj}
                          placeholder="e.g. AETHER"
                          className="w-full text-xs"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[#888888] mb-1 uppercase tracking-wider">Industry *</label>
                        <Input 
                          value={projForm.industry}
                          onChange={(e) => setProjForm({ ...projForm, industry: e.target.value })}
                          placeholder="e.g. DeFi Protocol"
                          className="w-full text-xs"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[#888888] mb-1 uppercase tracking-wider">Scale *</label>
                        <Input 
                          value={projForm.scale}
                          onChange={(e) => setProjForm({ ...projForm, scale: e.target.value })}
                          placeholder="e.g. $42M / Day Volume"
                          className="w-full text-xs"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[#888888] mb-1 uppercase tracking-wider">Stack (Comma separated) *</label>
                        <Input 
                          value={projForm.stack}
                          onChange={(e) => setProjForm({ ...projForm, stack: e.target.value })}
                          placeholder="Rust, Go, Solidity, AWS"
                          className="w-full text-xs"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[#888888] mb-1 uppercase tracking-wider">IPFS CID Blueprint (Optional)</label>
                        <Input 
                          value={projForm.ipfsCid}
                          onChange={(e) => setProjForm({ ...projForm, ipfsCid: e.target.value })}
                          placeholder="QmaX..."
                          className="w-full text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[#888888] mb-1 uppercase tracking-wider">Problem *</label>
                        <Textarea 
                          value={projForm.problem}
                          onChange={(e) => setProjForm({ ...projForm, problem: e.target.value })}
                          placeholder="The bottleneck client faced..."
                          className="w-full min-h-[60px] text-xs"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[#888888] mb-1 uppercase tracking-wider">Solution *</label>
                        <Textarea 
                          value={projForm.solution}
                          onChange={(e) => setProjForm({ ...projForm, solution: e.target.value })}
                          placeholder="The architecture collective deployed..."
                          className="w-full min-h-[60px] text-xs"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[#888888] mb-1 uppercase tracking-wider">Result *</label>
                        <Textarea 
                          value={projForm.result}
                          onChange={(e) => setProjForm({ ...projForm, result: e.target.value })}
                          placeholder="Uptime SLA met and request capacity..."
                          className="w-full min-h-[60px] text-xs"
                          required
                        />
                      </div>

                      <Button variant="neo" className="w-full mt-4 flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        {editingProj ? 'UPDATE RECORD' : 'COMMIT RECORD'}
                      </Button>
                    </form>
                  </Card>
                </div>

                {/* List Column */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {projects.map((p: any) => (
                      <Card key={p.codename} className="p-6 border border-[#2A2A2A] bg-[#121212]/30 flex flex-col justify-between gap-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif text-xl font-bold text-[#FFD700]">{p.codename}</h4>
                              <Badge variant="cyan">{p.industry}</Badge>
                            </div>
                            <p className="text-xs text-[#888888] mt-1">Scale: {p.scale}</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => editProject(p)}
                              className="p-1.5 border border-[#2A2A2A] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors"
                              title="Edit Record"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteProject(p.codename)}
                              className="p-1.5 border border-[#2A2A2A] hover:border-red-500 hover:text-red-500 transition-colors"
                              title="Delete/Purge Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed border-t border-[#2A2A2A]/50 pt-4">
                          <div>
                            <span className="text-[10px] text-[#888888] uppercase block mb-1">Problem</span>
                            <p className="text-[#888888] line-clamp-3">{p.problem}</p>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#888888] uppercase block mb-1">Solution</span>
                            <p className="text-[#888888] line-clamp-3">{p.solution}</p>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#888888] uppercase block mb-1">Result</span>
                            <p className="text-[#888888] line-clamp-3">{p.result}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 border-t border-[#2A2A2A]/30 pt-3">
                          {p.stack.map((s: string) => (
                            <span key={s} className="text-[10px] bg-[#1A1A1A] px-2 py-0.5 border border-[#2A2A2A] text-[#888888]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ROSTER PANEL */}
            {activeTab === 'roster' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Form Column */}
                <div className="lg:col-span-1">
                  <Card className="p-6 border-2 border-[#FF4500]/50 bg-[#121212]/90">
                    <h3 className="font-serif text-lg font-bold text-[#EAEAEA] mb-4 flex items-center justify-between">
                      <span>{editingRost ? 'EDIT TEAM MEMBER' : 'ADD TEAM MEMBER'}</span>
                      {editingRost && (
                        <button onClick={resetRostForm} className="text-xs text-red-500 hover:underline">Cancel</button>
                      )}
                    </h3>

                    <form onSubmit={saveRoster} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-[#888888] mb-1 uppercase tracking-wider">Handle *</label>
                        <Input 
                          value={rostForm.handle}
                          onChange={(e) => setRostForm({ ...rostForm, handle: e.target.value })}
                          disabled={!!editingRost}
                          placeholder="e.g. Architect Ω"
                          className="w-full text-xs"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[#888888] mb-1 uppercase tracking-wider">Role *</label>
                        <Input 
                          value={rostForm.role}
                          onChange={(e) => setRostForm({ ...rostForm, role: e.target.value })}
                          placeholder="e.g. Lead Systems Architect"
                          className="w-full text-xs"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[#888888] mb-1 uppercase tracking-wider">Experience *</label>
                        <Input 
                          value={rostForm.experience}
                          onChange={(e) => setRostForm({ ...rostForm, experience: e.target.value })}
                          placeholder="e.g. 16 yrs"
                          className="w-full text-xs"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[#888888] mb-1 uppercase tracking-wider">Timezone Assignment *</label>
                        <Input 
                          value={rostForm.timezone}
                          onChange={(e) => setRostForm({ ...rostForm, timezone: e.target.value })}
                          placeholder="e.g. UTC -5"
                          className="w-full text-xs"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[#888888] mb-1 uppercase tracking-wider">Stack (Comma separated) *</label>
                        <Input 
                          value={rostForm.stack}
                          onChange={(e) => setRostForm({ ...rostForm, stack: e.target.value })}
                          placeholder="Rust, Go, K8s, CockroachDB"
                          className="w-full text-xs"
                          required
                        />
                      </div>

                      <Button variant="neo" className="w-full mt-4 flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        {editingRost ? 'UPDATE ENGINEER' : 'ALLOCATE ENGINEER'}
                      </Button>
                    </form>
                  </Card>
                </div>

                {/* List Column */}
                <div className="lg:col-span-2">
                  <div className="border border-[#2A2A2A] bg-[#121212]/30 overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#2A2A2A] bg-black text-[#888888] uppercase tracking-wider">
                          <th className="p-4 font-mono font-medium">Handle</th>
                          <th className="p-4 font-mono font-medium">Role</th>
                          <th className="p-4 font-mono font-medium">Experience</th>
                          <th className="p-4 font-mono font-medium">Timezone</th>
                          <th className="p-4 font-mono font-medium">Stack</th>
                          <th className="p-4 font-mono font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roster.map((member: any) => (
                          <tr key={member.handle} className="border-b border-[#2A2A2A]/50 hover:bg-[#1A1A1A]/40 transition-colors">
                            <td className="p-4 font-bold text-[#00F0FF]">{member.handle}</td>
                            <td className="p-4 text-[#EAEAEA]">{member.role}</td>
                            <td className="p-4 text-[#888888]">{member.experience}</td>
                            <td className="p-4 text-xs font-semibold text-[#FFD700]">{member.timezone}</td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-1 max-w-[200px]">
                                {member.stack.map((s: string) => (
                                  <span key={s} className="text-[10px] bg-[#1A1A1A] px-1.5 py-0.5 border border-[#2A2A2A] text-[#888888]">{s}</span>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button 
                                  onClick={() => editRoster(member)}
                                  className="p-1 border border-[#2A2A2A] hover:border-[#00F0FF] hover:text-[#00F0FF]"
                                  title="Edit Roster Member"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => deleteRoster(member.handle)}
                                  className="p-1 border border-[#2A2A2A] hover:border-red-500 hover:text-red-500"
                                  title="Delete Roster Member"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* LEADS PANEL */}
            {activeTab === 'leads' && (
              <div className="space-y-4">
                {leads.length === 0 ? (
                  <div className="text-center py-20 border border-[#2A2A2A] bg-[#121212]/20 text-[#888888]">
                    No incoming leads captured in database logs.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {leads.map((lead: any) => (
                      <Card key={lead.timestamp} className="p-6 border-2 border-[#2A2A2A] bg-[#121212]/40 relative">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2A]/50 pb-4 mb-4">
                          <div>
                            <div className="flex items-center gap-3">
                              <h4 className="font-serif text-lg font-bold text-[#EAEAEA]">{lead.fullName}</h4>
                              <Badge variant={lead.tier === 'Incident Response' ? 'danger' : lead.tier === 'Scale' ? 'orange' : 'default'}>
                                {lead.tier}
                              </Badge>
                              {lead.ndaReady && <Badge variant="cyan">NDA Pre-Signed</Badge>}
                            </div>
                            <p className="text-xs text-[#888888] mt-1">
                              Company: <span className="text-[#EAEAEA]">{lead.companyName}</span> · Role: <span className="text-[#EAEAEA]">{lead.role}</span>
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-[#888888]">
                              {new Date(lead.timestamp).toLocaleString()}
                            </span>
                            <button 
                              onClick={() => purgeLead(lead.timestamp)}
                              className="p-2 border border-[#2A2A2A] hover:border-red-500 hover:text-red-500 transition-colors flex items-center gap-1.5 text-xs text-red-500 font-semibold"
                            >
                              <Trash2 className="w-4 h-4" />
                              Purge Record
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <span className="text-[10px] text-[#888888] uppercase block mb-1">Corporate Channel</span>
                            <a href={`mailto:${lead.email}`} className="text-xs text-[#00F0FF] hover:underline font-bold">
                              {lead.email}
                            </a>
                          </div>

                          {lead.referralCode && (
                            <div>
                              <span className="text-[10px] text-[#888888] uppercase block mb-1">Referral Code</span>
                              <code className="text-xs bg-[#1A1A1A] px-2 py-0.5 border border-[#2A2A2A] text-[#FFD700]">
                                {lead.referralCode}
                              </code>
                            </div>
                          )}

                          <div>
                            <span className="text-[10px] text-[#888888] uppercase block mb-1">Technical Brief</span>
                            <p className="text-xs text-[#EAEAEA] leading-relaxed bg-[#0A0A0A] p-4 border border-[#2A2A2A] rounded-none select-text">
                              {lead.technicalBrief}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
            
          </div>
        )}
        
      </div>
    </div>
  );
}
