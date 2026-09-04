"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  projectType: string | null;
  budget: string | null;
  message: string;
  createdAt: string;
};

type Service = {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
};

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl: string | null;
};

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
};

type Category = {
  id: string;
  label: string;
  icon: string;
  skills: { id: string; name: string }[];
};

type AdminData = {
  messages: Message[];
  services: Service[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  categories: Category[];
};

type Tab = "overview" | "messages" | "services" | "portfolio" | "testimonials" | "skills";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "messages", label: "Inbox", icon: "✉" },
  { id: "services", label: "Services", icon: "▤" },
  { id: "portfolio", label: "Portfolio", icon: "◫" },
  { id: "testimonials", label: "Testimonials", icon: "✦" },
  { id: "skills", label: "Skills", icon: "⌘" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function StatCard({ label, value, detail, accent }: { label: string; value: number; detail: string; accent: string }) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-top">
        <span className="admin-label">{label}</span>
        <span className="admin-stat-dot" style={{ backgroundColor: accent }} />
      </div>
      <strong>{value}</strong>
      <span className="admin-muted">{detail}</span>
    </div>
  );
}

export default function AdminPanel({ initialData }: { initialData: AdminData }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [query, setQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const filteredMessages = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return initialData.messages;
    return initialData.messages.filter((message) =>
      [message.name, message.email, message.projectType, message.budget, message.message]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [initialData.messages, query]);

  const openMessages = () => {
    setActiveTab("messages");
    setQuery("");
  };

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand">
          <span className="admin-brand-mark">R</span>
          <span><strong>Ritbha</strong><small>Control room</small></span>
        </Link>
        <div className="admin-sidebar-rule" />
        <p className="admin-sidebar-heading">Workspace</p>
        <nav className="admin-nav" aria-label="Admin navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "admin-nav-item active" : "admin-nav-item"}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.id === "messages" && initialData.messages.length > 0 && <b>{initialData.messages.length}</b>}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <span className="admin-status"><i /> System online</span>
          <Link href="/" className="admin-back-link">← Back to website</Link>
        </div>
      </aside>

      <section className="admin-content">
        <header className="admin-topbar">
          <div>
            <span className="admin-kicker">Ritbha / Admin</span>
            <h1>{tabs.find((tab) => tab.id === activeTab)?.label}</h1>
          </div>
          <div className="admin-top-actions">
            <span className="admin-date">{new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(new Date())}</span>
            <Link href="/" className="admin-view-site">View site ↗</Link>
          </div>
        </header>

        {activeTab === "overview" && (
          <div className="admin-view">
            <div className="admin-welcome">
              <div>
                <span className="admin-kicker">Good to see you, Bharat</span>
                <h2>Your studio at a glance.</h2>
                <p>Keep an eye on leads, content and the pieces that make Ritbha move.</p>
              </div>
              <button className="admin-primary-button" onClick={openMessages}>Open inbox <span>→</span></button>
            </div>
            <div className="admin-stats-grid">
              <StatCard label="New enquiries" value={initialData.messages.length} detail="All contact submissions" accent="#f49b45" />
              <StatCard label="Services" value={initialData.services.length} detail="Published offerings" accent="#9ce3c2" />
              <StatCard label="Projects" value={initialData.portfolio.length} detail="Portfolio case studies" accent="#e9c46a" />
              <StatCard label="Skills" value={initialData.categories.reduce((total, category) => total + category.skills.length, 0)} detail={`${initialData.categories.length} skill groups`} accent="#df8b9a" />
            </div>
            <div className="admin-overview-grid">
              <div className="admin-panel-card admin-activity-card">
                <div className="admin-card-heading"><div><span className="admin-kicker">Latest activity</span><h3>Recent enquiries</h3></div><button className="admin-text-button" onClick={openMessages}>See all →</button></div>
                {initialData.messages.length === 0 ? <EmptyState text="No enquiries yet. They will appear here when someone uses the contact form." /> : initialData.messages.slice(0, 4).map((message) => (
                  <button className="admin-activity-row" key={message.id} onClick={() => setSelectedMessage(message)}>
                    <span className="admin-avatar">{message.name.charAt(0).toUpperCase()}</span>
                    <span className="admin-activity-copy"><strong>{message.name}</strong><small>{message.projectType || "General enquiry"} · {formatDate(message.createdAt)}</small></span>
                    <span className="admin-row-arrow">↗</span>
                  </button>
                ))}
              </div>
              <div className="admin-panel-card admin-health-card">
                <div className="admin-card-heading"><div><span className="admin-kicker">Content health</span><h3>What is live</h3></div><span className="admin-live-pill">LIVE</span></div>
                <HealthRow label="Services" value={initialData.services.length} />
                <HealthRow label="Portfolio projects" value={initialData.portfolio.length} />
                <HealthRow label="Testimonials" value={initialData.testimonials.length} />
                <HealthRow label="Skill categories" value={initialData.categories.length} />
                <div className="admin-health-note">Public pages are reading directly from your database.</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="admin-view">
            <div className="admin-section-intro"><div><span className="admin-kicker">Lead pipeline</span><h2>Every conversation, in one place.</h2></div><span className="admin-count-label">{filteredMessages.length} result{filteredMessages.length === 1 ? "" : "s"}</span></div>
            <div className="admin-search-wrap"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, email or project..." /></div>
            <div className="admin-message-list">
              {filteredMessages.length === 0 ? <EmptyState text={query ? "No messages match your search." : "No contact messages have arrived yet."} /> : filteredMessages.map((message) => (
                <button className="admin-message-row" key={message.id} onClick={() => setSelectedMessage(message)}>
                  <span className="admin-avatar large">{message.name.charAt(0).toUpperCase()}</span>
                  <span className="admin-message-main"><strong>{message.name}</strong><small>{message.email}</small></span>
                  <span className="admin-message-project">{message.projectType || "General enquiry"}</span>
                  <span className="admin-message-date">{formatDate(message.createdAt)}</span>
                  <span className="admin-row-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "services" && <CollectionView kicker="Offerings" title="Services" items={initialData.services.map((service) => ({ title: service.title, meta: service.price, description: service.description, tags: service.features }))} />}
        {activeTab === "portfolio" && <CollectionView kicker="Selected work" title="Portfolio" items={initialData.portfolio.map((item) => ({ title: item.title, meta: item.category, description: item.description, tags: item.stack }))} />}
        {activeTab === "testimonials" && <CollectionView kicker="Social proof" title="Testimonials" items={initialData.testimonials.map((item) => ({ title: item.name, meta: `${item.role} · ${item.company}`, description: `“${item.quote}”`, tags: [] }))} />}
        {activeTab === "skills" && <CollectionView kicker="Capabilities" title="Skills" items={initialData.categories.map((category) => ({ title: `${category.icon} ${category.label}`, meta: `${category.skills.length} skills`, description: category.skills.map((skill) => skill.name).join(" · "), tags: category.skills.map((skill) => skill.name) }))} />}
      </section>

      {selectedMessage && <MessageDrawer message={selectedMessage} onClose={() => setSelectedMessage(null)} />}
    </main>
  );
}

function HealthRow({ label, value }: { label: string; value: number }) {
  return <div className="admin-health-row"><span>{label}</span><strong>{value}</strong></div>;
}

function EmptyState({ text }: { text: string }) {
  return <div className="admin-empty-state"><span>○</span><p>{text}</p></div>;
}

function CollectionView({ kicker, title, items }: { kicker: string; title: string; items: { title: string; meta: string; description: string; tags: string[] }[] }) {
  return (
    <div className="admin-view">
      <div className="admin-section-intro"><div><span className="admin-kicker">{kicker}</span><h2>{title}</h2></div><span className="admin-count-label">{items.length} published</span></div>
      <div className="admin-collection-grid">
        {items.map((item) => <article className="admin-collection-card" key={item.title}><div className="admin-collection-top"><span className="admin-record-dot" /><span className="admin-meta">{item.meta}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="admin-tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}
      </div>
    </div>
  );
}

function MessageDrawer({ message, onClose }: { message: Message; onClose: () => void }) {
  return <div className="admin-drawer-backdrop" onClick={onClose}><aside className="admin-drawer" onClick={(event) => event.stopPropagation()}><button className="admin-drawer-close" onClick={onClose} aria-label="Close message">×</button><span className="admin-kicker">Enquiry details</span><div className="admin-drawer-avatar">{message.name.charAt(0).toUpperCase()}</div><h2>{message.name}</h2><a href={`mailto:${message.email}`} className="admin-drawer-email">{message.email}</a><div className="admin-drawer-facts"><span><small>Project</small><strong>{message.projectType || "General enquiry"}</strong></span><span><small>Budget</small><strong>{message.budget || "Not specified"}</strong></span><span><small>Received</small><strong>{formatDate(message.createdAt)}</strong></span></div><div className="admin-drawer-message"><small>Message</small><p>{message.message}</p></div><a href={`mailto:${message.email}?subject=Re: Ritbha enquiry`} className="admin-primary-button drawer-button">Reply by email <span>↗</span></a></aside></div>;
}
