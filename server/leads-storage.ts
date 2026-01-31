import * as fs from "fs";
import * as path from "path";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  company: string;
  service: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Load all leads from JSON file
export function loadLeads(): Lead[] {
  ensureDataDir();
  
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn("[Leads Storage] Error reading leads file:", error);
  }
  
  return [];
}

// Save leads to JSON file
function saveLeads(leads: Lead[]): void {
  ensureDataDir();
  
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (error) {
    console.error("[Leads Storage] Error saving leads:", error);
    throw error;
  }
}

// Add a new lead
export function addLead(lead: Omit<Lead, "id" | "createdAt">): Lead {
  const leads = loadLeads();
  
  const newLead: Lead = {
    ...lead,
    id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  
  leads.push(newLead);
  saveLeads(leads);
  
  return newLead;
}

// Get lead by ID
export function getLeadById(id: string): Lead | undefined {
  const leads = loadLeads();
  return leads.find(lead => lead.id === id);
}

// Get all leads
export function getAllLeads(): Lead[] {
  return loadLeads();
}

// Delete lead by ID
export function deleteLead(id: string): boolean {
  const leads = loadLeads();
  const index = leads.findIndex(lead => lead.id === id);
  
  if (index === -1) return false;
  
  leads.splice(index, 1);
  saveLeads(leads);
  
  return true;
}
