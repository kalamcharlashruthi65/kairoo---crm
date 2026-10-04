// Client-side persistent storage and API service
// Mirrors backend /api endpoints with localStorage + in-memory sync for instant reactivity

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Sales Employee' | 'Support Employee';
  department?: string;
  status: 'Active' | 'Disabled';
  company?: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: 'Active' | 'Lead' | 'Churned' | 'VIP';
  assignedEmployee: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  interest: string;
  assignedTo: string;
  status: 'New Lead' | 'Contacted' | 'Interested' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: string;
  name: string;
  company: string;
  contact: string;
  value: number;
  stage: 'New Lead' | 'Contacted' | 'Interested' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  assignedTo: string;
  expectedCloseDate: string;
  tag?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  relatedCustomer?: string;
  relatedLead?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Call {
  id: string;
  contactName: string;
  phone: string;
  type: 'Inbound' | 'Outbound';
  status: 'Scheduled' | 'Completed' | 'Missed';
  callDate: string;
  durationMinutes?: number;
  assignedEmployee: string;
  notes: string;
  relatedCustomer?: string;
  relatedLead?: string;
  createdAt: string;
}

export interface Communication {
  id: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Note';
  subject: string;
  content: string;
  relatedCustomer?: string;
  relatedLead?: string;
  author: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Meeting' | 'Call' | 'Task' | 'Follow-up';
  attendees: string;
  notes: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  customerId: string;
  customerName?: string;
  subject: string;
  description: string;
  category: 'Technical' | 'Billing' | 'Feature Request' | 'General';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedTo: string;
  status: 'Open' | 'Assigned' | 'In Progress' | 'Waiting for Customer' | 'Resolved' | 'Closed';
  createdAt: string;
  updatedAt: string;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  authorName: string;
  authorRole: string;
  message: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId?: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  description: string;
  createdAt: string;
}

// STORAGE KEYS
const STORAGE_PREFIX = 'kairoo_crm_';

function getStored<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to set localStorage', err);
  }
}

// REAL INITIAL DATA SEEDING IF EMPTY
function initializeData() {
  const users = getStored<User[]>('users', []);
  if (users.length === 0) {
    const defaultUsers: User[] = [
      {
        id: 'usr_1',
        name: 'Rahul Sharma',
        email: 'rahul@kairoo.com',
        role: 'Admin',
        department: 'Leadership',
        status: 'Active',
        company: 'Kairoo Technologies',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr_2',
        name: 'Priya Reddy',
        email: 'priya@kairoo.com',
        role: 'Manager',
        department: 'Sales & Growth',
        status: 'Active',
        company: 'Kairoo Technologies',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr_3',
        name: 'Arjun Kumar',
        email: 'arjun@kairoo.com',
        role: 'Sales Employee',
        department: 'Inbound Sales',
        status: 'Active',
        company: 'Kairoo Technologies',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr_4',
        name: 'Ananya Roy',
        email: 'ananya@kairoo.com',
        role: 'Support Employee',
        department: 'Customer Care',
        status: 'Active',
        company: 'Kairoo Technologies',
        createdAt: new Date().toISOString(),
      },
    ];
    setStored('users', defaultUsers);
  }

  // Customers
  const customers = getStored<Customer[]>('customers', []);
  if (customers.length === 0) {
    const defaultCustomers: Customer[] = [
      {
        id: 'cust_101',
        name: 'TechNova Solutions',
        email: 'contact@technova.com',
        phone: '+91 98765 43210',
        company: 'TechNova Solutions',
        source: 'Website Enquiries',
        status: 'VIP',
        assignedEmployee: 'Rahul Sharma',
        notes: 'Enterprise account with 200+ employees. Annual SaaS renewal planned for Q4.',
        createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'cust_102',
        name: 'Studio Lumina Architecture',
        email: 'devika@studiolumina.com',
        phone: '+91 91234 56789',
        company: 'Studio Lumina Architecture',
        source: 'Referral',
        status: 'Active',
        assignedEmployee: 'Priya Reddy',
        notes: 'Design firm utilizing Kairoo for client proposal tracking and multi-tier invoicing.',
        createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'cust_103',
        name: 'Zenith Logistics Hub',
        email: 'operations@zenithlog.com',
        phone: '+91 99887 76655',
        company: 'Zenith Logistics Hub',
        source: 'Direct Inbound',
        status: 'Active',
        assignedEmployee: 'Arjun Kumar',
        notes: 'Supply chain operator requiring real-time call tracking and SLA support dispatch.',
        createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'cust_104',
        name: 'Aura Hospitality Suites',
        email: 'management@aurahotels.com',
        phone: '+91 94567 89012',
        company: 'Aura Hospitality Suites',
        source: 'Event QR',
        status: 'Lead',
        assignedEmployee: 'Priya Reddy',
        notes: 'Looking to centralize multi-property corporate booking inquiries and guest feedback.',
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    setStored('customers', defaultCustomers);
  }

  // Leads
  const leads = getStored<Lead[]>('leads', []);
  if (leads.length === 0) {
    const defaultLeads: Lead[] = [
      {
        id: 'lead_201',
        name: 'Sovereign Capital',
        email: 'anand@sovereigncap.com',
        phone: '+91 98111 22233',
        company: 'Sovereign Capital Advisors',
        source: 'Website Demo Request',
        interest: 'Enterprise Plan',
        assignedTo: 'Rahul Sharma',
        status: 'Interested',
        notes: 'Requested customized pricing for 35 wealth managers.',
        createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'lead_202',
        name: 'Vanguard Retail Systems',
        email: 'mira@vanguardretail.in',
        phone: '+91 97222 33344',
        company: 'Vanguard Retail',
        source: 'Google Ads',
        interest: 'Growth Plan',
        assignedTo: 'Arjun Kumar',
        status: 'Contacted',
        notes: 'Initial pitch call scheduled for tomorrow morning.',
        createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'lead_203',
        name: 'Elevate Health Diagnostics',
        email: 'sunita@elevatehealth.org',
        phone: '+91 96333 44455',
        company: 'Elevate Health Labs',
        source: 'Referral',
        interest: 'Custom Workflow Integration',
        assignedTo: 'Priya Reddy',
        status: 'Proposal',
        notes: 'Technical proposal sent with compliance documentation.',
        createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'lead_204',
        name: 'Nexus Mobility',
        email: 'karan@nexusmob.com',
        phone: '+91 95444 55566',
        company: 'Nexus Mobility',
        source: 'LinkedIn Campaign',
        interest: 'Standard Plan',
        assignedTo: 'Arjun Kumar',
        status: 'New Lead',
        notes: 'Downloaded Kairoo Enterprise Whitepaper.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    setStored('leads', defaultLeads);
  }

  // Deals (Pipeline)
  const deals = getStored<Deal[]>('deals', []);
  if (deals.length === 0) {
    const defaultDeals: Deal[] = [
      {
        id: 'deal_301',
        name: 'TechNova Cloud Expansion',
        company: 'TechNova Solutions',
        contact: 'Rahul Sharma',
        value: 1640000,
        stage: 'Won',
        assignedTo: 'Rahul Sharma',
        expectedCloseDate: '2026-10-15',
        tag: 'Enterprise',
        notes: 'Full CRM & AI Intelligence deployment across 4 offices.',
        createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'deal_302',
        name: 'Studio Lumina Yearly Retainer',
        company: 'Studio Lumina Architecture',
        contact: 'Devika Sen',
        value: 1200000,
        stage: 'Won',
        assignedTo: 'Priya Reddy',
        expectedCloseDate: '2026-10-01',
        tag: 'Creative',
        notes: 'Annual upfront payment received via Razorpay.',
        createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'deal_303',
        name: 'Sovereign Capital Wealth CRM',
        company: 'Sovereign Capital',
        contact: 'Anand Patel',
        value: 420000,
        stage: 'Interested',
        assignedTo: 'Rahul Sharma',
        expectedCloseDate: '2026-11-10',
        tag: 'FinTech',
        notes: 'Reviewing SOC2 security audit compliance.',
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'deal_304',
        name: 'Aura Hospitality Suites Suite',
        company: 'Aura Hospitality Suites',
        contact: 'Rohan Nambiar',
        value: 1020000,
        stage: 'Proposal',
        assignedTo: 'Priya Reddy',
        expectedCloseDate: '2026-10-25',
        tag: 'Hotel',
        notes: 'Proposal sent with multi-site discount package.',
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'deal_305',
        name: 'Nexus Fleet Telematics System',
        company: 'Nexus Mobility',
        contact: 'Karan Sen',
        value: 850000,
        stage: 'Contacted',
        assignedTo: 'Arjun Kumar',
        expectedCloseDate: '2026-11-20',
        tag: 'Supply',
        notes: 'Demo booked for technical evaluation.',
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'deal_306',
        name: 'Vanguard Omnichannel Point-of-Sale',
        company: 'Vanguard Retail',
        contact: 'Mira Joshi',
        value: 520000,
        stage: 'New Lead',
        assignedTo: 'Arjun Kumar',
        expectedCloseDate: '2026-12-05',
        tag: 'Omni',
        notes: 'Inbound evaluation request.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    setStored('deals', defaultDeals);
  }

  // Tasks
  const tasks = getStored<Task[]>('tasks', []);
  if (tasks.length === 0) {
    const defaultTasks: Task[] = [
      {
        id: 'task_401',
        title: 'Review proposal contract with Sovereign Capital',
        description: 'Send revised clause 4 regarding data backup frequency.',
        assignedTo: 'Rahul Sharma',
        priority: 'High',
        dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        status: 'In Progress',
        relatedLead: 'Sovereign Capital',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'task_402',
        title: 'Follow-up call with Priya Reddy regarding Aura Demo',
        description: 'Check if leadership had questions after presentation.',
        assignedTo: 'Priya Reddy',
        priority: 'Urgent',
        dueDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
        relatedCustomer: 'Aura Hospitality Suites',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'task_403',
        title: 'Onboard 15 new rep seats for TechNova',
        description: 'Provision SSO access and send calendar invites.',
        assignedTo: 'Arjun Kumar',
        priority: 'Medium',
        dueDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
        status: 'Completed',
        relatedCustomer: 'TechNova Solutions',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    setStored('tasks', defaultTasks);
  }

  // Calls
  const calls = getStored<Call[]>('calls', []);
  if (calls.length === 0) {
    const defaultCalls: Call[] = [
      {
        id: 'call_501',
        contactName: 'Anand Patel',
        phone: '+91 98111 22233',
        type: 'Outbound',
        status: 'Completed',
        callDate: new Date(Date.now() - 3600000).toISOString(),
        durationMinutes: 18,
        assignedEmployee: 'Rahul Sharma',
        notes: 'Walked through analytics dashboard and permission tiers.',
        relatedLead: 'Sovereign Capital',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'call_502',
        contactName: 'Priya Reddy',
        phone: '+91 94567 89012',
        type: 'Outbound',
        status: 'Scheduled',
        callDate: new Date(Date.now() + 7200000).toISOString(),
        assignedEmployee: 'Priya Reddy',
        notes: 'Review commercial proposal and deployment milestones.',
        relatedCustomer: 'Aura Hospitality Suites',
        createdAt: new Date().toISOString(),
      },
    ];
    setStored('calls', defaultCalls);
  }

  // Communications
  const comms = getStored<Communication[]>('communications', []);
  if (comms.length === 0) {
    const defaultComms: Communication[] = [
      {
        id: 'comm_601',
        type: 'Email',
        subject: 'Kairoo Enterprise Quote & SLA Details',
        content: 'Hi Anand, attached is the revised proposal for 35 seats including SLA guarantee.',
        relatedLead: 'Sovereign Capital',
        author: 'Rahul Sharma',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 'comm_602',
        type: 'Meeting',
        subject: 'Executive Quarterly Business Review',
        content: 'Reviewed Q3 velocity metrics and discussed automated churn signals.',
        relatedCustomer: 'TechNova Solutions',
        author: 'Rahul Sharma',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
    setStored('communications', defaultComms);
  }

  // Appointments (Calendar)
  const appts = getStored<Appointment[]>('appointments', []);
  if (appts.length === 0) {
    const defaultAppts: Appointment[] = [
      {
        id: 'apt_701',
        title: 'Discovery Call: Sovereign Capital',
        date: new Date().toISOString().split('T')[0],
        time: '11:00 AM',
        type: 'Call',
        attendees: 'Rahul Sharma, Anand Patel',
        notes: 'Product demonstration focused on AI deal forecasting.',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'apt_702',
        title: 'Weekly Pipeline Review',
        date: new Date().toISOString().split('T')[0],
        time: '04:00 PM',
        type: 'Meeting',
        attendees: 'All Sales Reps',
        notes: 'Review Q3 targets, stagnant deals, and closing cadences.',
        createdAt: new Date().toISOString(),
      },
    ];
    setStored('appointments', defaultAppts);
  }

  // Tickets
  const tickets = getStored<Ticket[]>('tickets', []);
  if (tickets.length === 0) {
    const defaultTickets: Ticket[] = [
      {
        id: 'TKT-1025',
        customerId: 'cust_101',
        customerName: 'TechNova Solutions',
        subject: 'SSO Integration Token Reset',
        description: 'Admin unable to provision new Okta SAML credentials after security update.',
        category: 'Technical',
        priority: 'High',
        assignedTo: 'Ananya Roy',
        status: 'In Progress',
        createdAt: new Date(Date.now() - 14400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'TKT-1024',
        customerId: 'cust_102',
        customerName: 'Studio Lumina Architecture',
        subject: 'Custom Invoice Tax Identifier',
        description: 'Need to add European VAT number to monthly subscription receipt.',
        category: 'Billing',
        priority: 'Medium',
        assignedTo: 'Ananya Roy',
        status: 'Resolved',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    setStored('tickets', defaultTickets);
  }

  // Ticket Messages
  const ticketMsgs = getStored<TicketMessage[]>('ticket_messages', []);
  if (ticketMsgs.length === 0) {
    setStored('ticket_messages', [
      {
        id: 'tmsg_1',
        ticketId: 'TKT-1025',
        authorName: 'Rahul Sharma (Customer)',
        authorRole: 'Client',
        message: 'Hello, our IT team rotated credentials and we are receiving an invalid SAML assertion error.',
        createdAt: new Date(Date.now() - 14000000).toISOString(),
      },
      {
        id: 'tmsg_2',
        ticketId: 'TKT-1025',
        authorName: 'Ananya Roy',
        authorRole: 'Support Specialist',
        message: 'Hi Rahul, looking into this now. Re-issuing the SP certificate on our security portal.',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
      },
    ]);
  }

  // Notifications
  const notifications = getStored<Notification[]>('notifications', []);
  if (notifications.length === 0) {
    const defaultNotifs: Notification[] = [
      {
        id: 'notif_1',
        type: 'New Lead',
        title: 'New Lead Captured',
        message: 'Rahul Sharma from TechNova Solutions submitted a demo request.',
        isRead: false,
        createdAt: new Date(Date.now() - 120000).toISOString(),
      },
      {
        id: 'notif_2',
        type: 'Follow-up Reminder',
        title: 'Follow-up Call Scheduled',
        message: 'Call with Priya Reddy scheduled for Today, 11:00 AM.',
        isRead: false,
        createdAt: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        id: 'notif_3',
        type: 'Support Ticket',
        title: 'High Priority Ticket TKT-1025',
        message: 'SSO Integration Token Reset assigned to Support.',
        isRead: false,
        createdAt: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 'notif_4',
        type: 'Deal Updated',
        title: 'Deal Won Milestone',
        message: 'TechNova Cloud Expansion marked as Won (+₹16.4L ARR).',
        isRead: true,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
    setStored('notifications', defaultNotifs);
  }

  // Activity logs
  const logs = getStored<ActivityLog[]>('activity_logs', []);
  if (logs.length === 0) {
    const defaultLogs: ActivityLog[] = [
      {
        id: 'act_1',
        entityType: 'Deal',
        entityId: 'deal_301',
        action: 'Won',
        description: 'TechNova Cloud Expansion marked Won (₹16.4L)',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 'act_2',
        entityType: 'Lead',
        entityId: 'lead_201',
        action: 'Created',
        description: 'Inbound lead Sovereign Capital captured',
        createdAt: new Date(Date.now() - 14400000).toISOString(),
      },
      {
        id: 'act_3',
        entityType: 'Ticket',
        entityId: 'TKT-1025',
        action: 'Created',
        description: 'Support Ticket TKT-1025 opened',
        createdAt: new Date(Date.now() - 28800000).toISOString(),
      },
    ];
    setStored('activity_logs', defaultLogs);
  }
}

// Call on module load
initializeData();

// DATA API REPOSITORIES
export const db = {
  // Current logged in user state
  getCurrentUser(): User | null {
    const raw = localStorage.getItem('kairoo_current_user');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    // Default to admin if signed in previously or auto-seed
    const users = getStored<User[]>('users', []);
    const admin = users.find((u) => u.role === 'Admin') || users[0] || null;
    if (admin) {
      localStorage.setItem('kairoo_current_user', JSON.stringify(admin));
    }
    return admin;
  },

  setCurrentUser(user: User | null) {
    if (user) {
      localStorage.setItem('kairoo_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kairoo_current_user');
    }
  },

  // USERS
  getUsers(): User[] {
    return getStored<User[]>('users', []);
  },
  saveUser(user: Partial<User> & { name: string; email: string }): User {
    const list = getStored<User[]>('users', []);
    if (user.id) {
      const idx = list.findIndex((u) => u.id === user.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...user };
        setStored('users', list);
        return list[idx];
      }
    }
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: user.name,
      email: user.email,
      role: user.role || 'Sales Employee',
      department: user.department || 'Sales',
      status: user.status || 'Active',
      company: user.company || 'Kairoo Workspace',
      createdAt: new Date().toISOString(),
    };
    list.unshift(newUser);
    setStored('users', list);
    return newUser;
  },
  deleteUser(id: string) {
    const list = getStored<User[]>('users', []).filter((u) => u.id !== id);
    setStored('users', list);
  },

  // CUSTOMERS
  getCustomers(): Customer[] {
    return getStored<Customer[]>('customers', []);
  },
  saveCustomer(customer: Partial<Customer> & { name: string; email: string }): Customer {
    const list = getStored<Customer[]>('customers', []);
    const now = new Date().toISOString();
    if (customer.id) {
      const idx = list.findIndex((c) => c.id === customer.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...customer, updatedAt: now };
        setStored('customers', list);
        this.logActivity('Customer', list[idx].id, 'Updated', `Updated customer ${list[idx].name}`);
        return list[idx];
      }
    }
    const newCustomer: Customer = {
      id: `cust_${Date.now()}`,
      name: customer.name,
      email: customer.email,
      phone: customer.phone || '',
      company: customer.company || customer.name,
      source: customer.source || 'Direct',
      status: customer.status || 'Active',
      assignedEmployee: customer.assignedEmployee || 'Rahul Sharma',
      notes: customer.notes || '',
      createdAt: now,
      updatedAt: now,
    };
    list.unshift(newCustomer);
    setStored('customers', list);
    this.logActivity('Customer', newCustomer.id, 'Created', `Added new customer ${newCustomer.name}`);
    return newCustomer;
  },
  deleteCustomer(id: string) {
    const list = getStored<Customer[]>('customers', []);
    const removed = list.find((c) => c.id === id);
    const updated = list.filter((c) => c.id !== id);
    setStored('customers', updated);
    if (removed) {
      this.logActivity('Customer', id, 'Deleted', `Deleted customer ${removed.name}`);
    }
  },

  // LEADS
  getLeads(): Lead[] {
    return getStored<Lead[]>('leads', []);
  },
  saveLead(lead: Partial<Lead> & { name: string; email: string }): Lead {
    const list = getStored<Lead[]>('leads', []);
    const now = new Date().toISOString();
    if (lead.id) {
      const idx = list.findIndex((l) => l.id === lead.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...lead, updatedAt: now };
        setStored('leads', list);
        this.logActivity('Lead', list[idx].id, 'Updated', `Updated lead ${list[idx].name}`);
        return list[idx];
      }
    }
    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      name: lead.name,
      email: lead.email,
      phone: lead.phone || '',
      company: lead.company || lead.name,
      source: lead.source || 'Website Enquiries',
      interest: lead.interest || 'Standard Plan',
      assignedTo: lead.assignedTo || 'Arjun Kumar',
      status: lead.status || 'New Lead',
      notes: lead.notes || '',
      createdAt: now,
      updatedAt: now,
    };
    list.unshift(newLead);
    setStored('leads', list);
    this.logActivity('Lead', newLead.id, 'Created', `Captured new lead ${newLead.name}`);
    this.createNotification({
      type: 'New Lead',
      title: 'New Lead Captured',
      message: `${newLead.name} (${newLead.company}) is ready for qualification.`,
    });
    return newLead;
  },
  deleteLead(id: string) {
    const list = getStored<Lead[]>('leads', []);
    const removed = list.find((l) => l.id === id);
    const updated = list.filter((l) => l.id !== id);
    setStored('leads', updated);
    if (removed) {
      this.logActivity('Lead', id, 'Deleted', `Deleted lead ${removed.name}`);
    }
  },

  // DEALS (PIPELINE)
  getDeals(): Deal[] {
    return getStored<Deal[]>('deals', []);
  },
  saveDeal(deal: Partial<Deal> & { name: string; value: number }): Deal {
    const list = getStored<Deal[]>('deals', []);
    const now = new Date().toISOString();
    if (deal.id) {
      const idx = list.findIndex((d) => d.id === deal.id);
      if (idx !== -1) {
        const prevStage = list[idx].stage;
        list[idx] = { ...list[idx], ...deal, updatedAt: now };
        setStored('deals', list);
        this.logActivity(
          'Deal',
          list[idx].id,
          'Updated',
          prevStage !== list[idx].stage
            ? `Moved deal "${list[idx].name}" from ${prevStage} to ${list[idx].stage}`
            : `Updated deal ${list[idx].name}`
        );
        return list[idx];
      }
    }
    const newDeal: Deal = {
      id: `deal_${Date.now()}`,
      name: deal.name,
      company: deal.company || deal.name,
      contact: deal.contact || 'Primary Contact',
      value: Number(deal.value) || 0,
      stage: deal.stage || 'New Lead',
      assignedTo: deal.assignedTo || 'Rahul Sharma',
      expectedCloseDate: deal.expectedCloseDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      tag: deal.tag || 'Standard',
      notes: deal.notes || '',
      createdAt: now,
      updatedAt: now,
    };
    list.unshift(newDeal);
    setStored('deals', list);
    this.logActivity('Deal', newDeal.id, 'Created', `Created pipeline deal ${newDeal.name} (₹${newDeal.value.toLocaleString()})`);
    return newDeal;
  },
  deleteDeal(id: string) {
    const list = getStored<Deal[]>('deals', []);
    const removed = list.find((d) => d.id === id);
    const updated = list.filter((d) => d.id !== id);
    setStored('deals', updated);
    if (removed) {
      this.logActivity('Deal', id, 'Deleted', `Deleted deal ${removed.name}`);
    }
  },

  // TASKS
  getTasks(): Task[] {
    return getStored<Task[]>('tasks', []);
  },
  saveTask(task: Partial<Task> & { title: string }): Task {
    const list = getStored<Task[]>('tasks', []);
    const now = new Date().toISOString();
    if (task.id) {
      const idx = list.findIndex((t) => t.id === task.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...task, updatedAt: now };
        setStored('tasks', list);
        this.logActivity('Task', list[idx].id, 'Updated', `Updated task ${list[idx].title}`);
        return list[idx];
      }
    }
    const newTask: Task = {
      id: `task_${Date.now()}`,
      title: task.title,
      description: task.description || '',
      assignedTo: task.assignedTo || 'Rahul Sharma',
      priority: task.priority || 'Medium',
      dueDate: task.dueDate || new Date().toISOString().split('T')[0],
      status: task.status || 'Pending',
      relatedCustomer: task.relatedCustomer || '',
      relatedLead: task.relatedLead || '',
      createdAt: now,
      updatedAt: now,
    };
    list.unshift(newTask);
    setStored('tasks', list);
    this.logActivity('Task', newTask.id, 'Created', `Added new task ${newTask.title}`);
    return newTask;
  },
  deleteTask(id: string) {
    const list = getStored<Task[]>('tasks', []).filter((t) => t.id !== id);
    setStored('tasks', list);
  },

  // CALLS
  getCalls(): Call[] {
    return getStored<Call[]>('calls', []);
  },
  saveCall(call: Partial<Call> & { contactName: string; phone: string }): Call {
    const list = getStored<Call[]>('calls', []);
    if (call.id) {
      const idx = list.findIndex((c) => c.id === call.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...call };
        setStored('calls', list);
        return list[idx];
      }
    }
    const newCall: Call = {
      id: `call_${Date.now()}`,
      contactName: call.contactName,
      phone: call.phone,
      type: call.type || 'Outbound',
      status: call.status || 'Completed',
      callDate: call.callDate || new Date().toISOString(),
      durationMinutes: call.durationMinutes || 5,
      assignedEmployee: call.assignedEmployee || 'Rahul Sharma',
      notes: call.notes || '',
      relatedCustomer: call.relatedCustomer || '',
      relatedLead: call.relatedLead || '',
      createdAt: new Date().toISOString(),
    };
    list.unshift(newCall);
    setStored('calls', list);
    this.logActivity('Call', newCall.id, 'Created', `Logged call with ${newCall.contactName}`);
    return newCall;
  },
  deleteCall(id: string) {
    const list = getStored<Call[]>('calls', []).filter((c) => c.id !== id);
    setStored('calls', list);
  },

  // COMMUNICATIONS
  getCommunications(): Communication[] {
    return getStored<Communication[]>('communications', []);
  },
  saveCommunication(comm: Partial<Communication> & { type: Communication['type']; subject: string }): Communication {
    const list = getStored<Communication[]>('communications', []);
    const newComm: Communication = {
      id: `comm_${Date.now()}`,
      type: comm.type,
      subject: comm.subject,
      content: comm.content || '',
      relatedCustomer: comm.relatedCustomer || '',
      relatedLead: comm.relatedLead || '',
      author: comm.author || 'Rahul Sharma',
      createdAt: new Date().toISOString(),
    };
    list.unshift(newComm);
    setStored('communications', list);
    this.logActivity('Communication', newComm.id, 'Created', `Logged ${newComm.type}: ${newComm.subject}`);
    return newComm;
  },

  // APPOINTMENTS
  getAppointments(): Appointment[] {
    return getStored<Appointment[]>('appointments', []);
  },
  saveAppointment(apt: Partial<Appointment> & { title: string; date: string }): Appointment {
    const list = getStored<Appointment[]>('appointments', []);
    const newApt: Appointment = {
      id: `apt_${Date.now()}`,
      title: apt.title,
      date: apt.date,
      time: apt.time || '10:00 AM',
      type: apt.type || 'Meeting',
      attendees: apt.attendees || 'Team',
      notes: apt.notes || '',
      createdAt: new Date().toISOString(),
    };
    list.unshift(newApt);
    setStored('appointments', list);
    this.logActivity('Appointment', newApt.id, 'Created', `Scheduled ${newApt.title}`);
    return newApt;
  },

  // TICKETS
  getTickets(): Ticket[] {
    return getStored<Ticket[]>('tickets', []);
  },
  saveTicket(ticket: Partial<Ticket> & { subject: string }): Ticket {
    const list = getStored<Ticket[]>('tickets', []);
    const now = new Date().toISOString();
    if (ticket.id) {
      const idx = list.findIndex((t) => t.id === ticket.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...ticket, updatedAt: now };
        setStored('tickets', list);
        this.logActivity('Ticket', list[idx].id, 'Updated', `Updated ticket ${list[idx].id}: ${list[idx].subject}`);
        return list[idx];
      }
    }
    const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: Ticket = {
      id: ticketId,
      customerId: ticket.customerId || 'cust_101',
      customerName: ticket.customerName || 'Direct Customer',
      subject: ticket.subject,
      description: ticket.description || '',
      category: ticket.category || 'General',
      priority: ticket.priority || 'Medium',
      assignedTo: ticket.assignedTo || 'Ananya Roy',
      status: ticket.status || 'Open',
      createdAt: now,
      updatedAt: now,
    };
    list.unshift(newTicket);
    setStored('tickets', list);
    this.logActivity('Ticket', newTicket.id, 'Created', `Created ticket ${newTicket.id}: ${newTicket.subject}`);
    this.createNotification({
      type: 'New Ticket',
      title: `Support Ticket ${newTicket.id}`,
      message: `${newTicket.subject} (${newTicket.priority} Priority).`,
    });
    return newTicket;
  },
  deleteTicket(id: string) {
    const list = getStored<Ticket[]>('tickets', []).filter((t) => t.id !== id);
    setStored('tickets', list);
  },

  // TICKET MESSAGES
  getTicketMessages(ticketId: string): TicketMessage[] {
    return getStored<TicketMessage[]>('ticket_messages', []).filter((m) => m.ticketId === ticketId);
  },
  addTicketMessage(ticketId: string, message: string, authorName: string, authorRole: string): TicketMessage {
    const list = getStored<TicketMessage[]>('ticket_messages', []);
    const newMsg: TicketMessage = {
      id: `tmsg_${Date.now()}`,
      ticketId,
      authorName,
      authorRole,
      message,
      createdAt: new Date().toISOString(),
    };
    list.push(newMsg);
    setStored('ticket_messages', list);
    return newMsg;
  },

  // NOTIFICATIONS
  getNotifications(): Notification[] {
    return getStored<Notification[]>('notifications', []);
  },
  createNotification(notif: { type: string; title: string; message: string; userId?: string }): Notification {
    const list = getStored<Notification[]>('notifications', []);
    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      ...notif,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newNotif);
    setStored('notifications', list);
    return newNotif;
  },
  markNotificationRead(id: string) {
    const list = getStored<Notification[]>('notifications', []);
    const item = list.find((n) => n.id === id);
    if (item) {
      item.isRead = true;
      setStored('notifications', list);
    }
  },
  markAllNotificationsRead() {
    const list = getStored<Notification[]>('notifications', []);
    list.forEach((n) => (n.isRead = true));
    setStored('notifications', list);
  },

  // ACTIVITY LOGS
  getActivityLogs(): ActivityLog[] {
    return getStored<ActivityLog[]>('activity_logs', []);
  },
  logActivity(entityType: string, entityId: string, action: string, description: string) {
    const list = getStored<ActivityLog[]>('activity_logs', []);
    list.unshift({
      id: `act_${Date.now()}`,
      entityType,
      entityId,
      action,
      description,
      createdAt: new Date().toISOString(),
    });
    setStored('activity_logs', list.slice(0, 50));
  },

  // SUMMARY METRICS & REPORTS (Calculated directly from real stored data)
  getMetricsSummary() {
    const customers = this.getCustomers();
    const leads = this.getLeads();
    const deals = this.getDeals();
    const tickets = this.getTickets();
    const tasks = this.getTasks();

    const wonDeals = deals.filter((d) => d.stage === 'Won');
    const lostDeals = deals.filter((d) => d.stage === 'Lost');
    const openDeals = deals.filter((d) => d.stage !== 'Won' && d.stage !== 'Lost');

    const totalRevenue = wonDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0);
    const pipelineValue = openDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0);
    const conversionRate = leads.length > 0 ? ((wonDeals.length / leads.length) * 100).toFixed(1) : '0';

    const openTickets = tickets.filter((t) => t.status !== 'Closed' && t.status !== 'Resolved').length;
    const pendingTasks = tasks.filter((t) => t.status !== 'Completed').length;

    return {
      totalCustomers: customers.length,
      activeLeads: leads.filter((l) => l.status !== 'Won' && l.status !== 'Lost').length,
      totalLeads: leads.length,
      openDeals: openDeals.length,
      wonDealsCount: wonDeals.length,
      lostDealsCount: lostDeals.length,
      totalRevenue,
      pipelineValue,
      conversionRate: Number(conversionRate),
      openTickets,
      pendingTasks,
    };
  },

  // GLOBAL SEARCH
  globalSearch(query: string) {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const results: Array<{
      type: string;
      id: string;
      title: string;
      subtitle: string;
      route: string;
    }> = [];

    // Customers
    this.getCustomers().forEach((c) => {
      if (c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.company.toLowerCase().includes(q)) {
        results.push({ type: 'Customer', id: c.id, title: c.name, subtitle: `${c.company} · ${c.status}`, route: '/customers' });
      }
    });

    // Leads
    this.getLeads().forEach((l) => {
      if (l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.company.toLowerCase().includes(q)) {
        results.push({ type: 'Lead', id: l.id, title: l.name, subtitle: `${l.status} · ${l.company}`, route: '/leads' });
      }
    });

    // Deals
    this.getDeals().forEach((d) => {
      if (d.name.toLowerCase().includes(q) || d.company.toLowerCase().includes(q)) {
        results.push({ type: 'Deal', id: d.id, title: d.name, subtitle: `${d.stage} · ₹${d.value.toLocaleString()}`, route: '/pipeline' });
      }
    });

    // Tickets
    this.getTickets().forEach((t) => {
      if (t.subject.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)) {
        results.push({ type: 'Ticket', id: t.id, title: t.subject, subtitle: `${t.id} · ${t.priority} Priority`, route: '/tickets' });
      }
    });

    // Tasks
    this.getTasks().forEach((tsk) => {
      if (tsk.title.toLowerCase().includes(q)) {
        results.push({ type: 'Task', id: tsk.id, title: tsk.title, subtitle: `${tsk.priority} Priority · ${tsk.status}`, route: '/tasks' });
      }
    });

    return results.slice(0, 15);
  },
};
