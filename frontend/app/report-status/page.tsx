"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  MessageSquare,
  ClipboardList,
} from "lucide-react";

// Mock data for reports
const MOCK_REPORTS = [
  {
    id: "REP-1234",
    title: "Network outage in Building B",
    type: "Issue",
    date: "May 1, 2025",
    status: "Resolved",
    priority: "High",
    assignee: "John Smith",
    description:
      "The network in Building B was down for approximately 2 hours. The issue was caused by a faulty router which has been replaced.",
    updates: [
      {
        date: "May 1, 2025 10:15 AM",
        user: "System",
        message: "Issue reported",
      },
      {
        date: "May 1, 2025 10:20 AM",
        user: "John Smith",
        message: "Assigned to IT team",
      },
      {
        date: "May 1, 2025 11:45 AM",
        user: "John Smith",
        message: "Identified faulty router as the cause",
      },
      {
        date: "May 1, 2025 12:30 PM",
        user: "John Smith",
        message: "Replaced router and restored network connectivity",
      },
      {
        date: "May 1, 2025 12:45 PM",
        user: "System",
        message: "Issue marked as resolved",
      },
    ],
  },
  {
    id: "REP-1233",
    title: "Quarterly safety inspection",
    type: "Report",
    date: "Apr 28, 2025",
    status: "In Review",
    priority: "Medium",
    assignee: "Sarah Johnson",
    description:
      "Completed the quarterly safety inspection for all facilities. Found minor issues in the east wing that need attention.",
    updates: [
      {
        date: "Apr 28, 2025 2:30 PM",
        user: "System",
        message: "Report submitted",
      },
      {
        date: "Apr 29, 2025 9:15 AM",
        user: "Sarah Johnson",
        message: "Started review of findings",
      },
      {
        date: "Apr 30, 2025 11:20 AM",
        user: "Sarah Johnson",
        message: "Scheduled maintenance for east wing issues",
      },
    ],
  },
  {
    id: "REP-1232",
    title: "Equipment malfunction",
    type: "Voice",
    date: "Apr 27, 2025",
    status: "Pending",
    priority: "Low",
    assignee: "Unassigned",
    description:
      "Voice report about the coffee machine in the break room not working properly.",
    updates: [
      {
        date: "Apr 27, 2025 3:45 PM",
        user: "System",
        message: "Voice report submitted",
      },
      {
        date: "Apr 28, 2025 8:30 AM",
        user: "System",
        message: "Awaiting assignment",
      },
    ],
  },
  {
    id: "REP-1231",
    title: "Broken window in conference room",
    type: "Issue",
    date: "Apr 26, 2025",
    status: "In Progress",
    priority: "Medium",
    assignee: "Mike Wilson",
    description:
      "The large window in the main conference room has a crack and needs to be replaced.",
    updates: [
      {
        date: "Apr 26, 2025 9:10 AM",
        user: "System",
        message: "Issue reported",
      },
      {
        date: "Apr 26, 2025 10:30 AM",
        user: "Mike Wilson",
        message: "Inspected damage and contacted glass repair company",
      },
      {
        date: "Apr 27, 2025 2:15 PM",
        user: "Mike Wilson",
        message: "Scheduled replacement for next week",
      },
    ],
  },
  {
    id: "REP-1230",
    title: "Monthly security audit",
    type: "Report",
    date: "Apr 25, 2025",
    status: "Completed",
    priority: "High",
    assignee: "Lisa Chen",
    description:
      "Completed the monthly security audit for all systems and physical access points.",
    updates: [
      {
        date: "Apr 25, 2025 4:30 PM",
        user: "System",
        message: "Report submitted",
      },
      {
        date: "Apr 26, 2025 11:45 AM",
        user: "Lisa Chen",
        message: "Reviewed findings and updated security protocols",
      },
      {
        date: "Apr 27, 2025 9:20 AM",
        user: "Lisa Chen",
        message: "Implemented recommended changes",
      },
      {
        date: "Apr 27, 2025 3:40 PM",
        user: "System",
        message: "Report marked as completed",
      },
    ],
  },
];

export default function ReportStatus() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<
    (typeof MOCK_REPORTS)[0] | null
  >(null);
  const [expandedFilters, setExpandedFilters] = useState(false);
  const [dataItem, setDataItem] = useState();
  
  const fetchData = async () => {
    try {
      const response = await fetch("https://9474-154-81-244-121.ngrok-free.app/report-status");
      const contentType = response.headers.get("content-type");
  
      if (contentType && contentType.includes("application/json")) {
        const json = await response.json();
        console.log("json: ", json);
        setDataItem(json);
      } else {
        const text = await response.text();
        console.error("Unexpected response (not JSON):", text);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {    
    fetchData();
  }, []);
  const filteredReports = MOCK_REPORTS.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? report.status === statusFilter : true;
    const matchesType = typeFilter ? report.type === typeFilter : true;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
      case "Completed":
        return "bg-emerald-100 text-emerald-800";
      case "In Progress":
      case "In Review":
        return "bg-sky-100 text-sky-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Issue":
        return "bg-amber-100 text-amber-800";
      case "Report":
        return "bg-emerald-100 text-emerald-800";
      case "Voice":
        return "bg-violet-100 text-violet-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-amber-600";
      case "Low":
        return "text-emerald-600";
      default:
        return "text-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center text-slate-600 hover:text-slate-800 mr-4"
            >
              <ArrowLeft size={20} className="mr-1" />
              <span>Back</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">Report Status</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by ID or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                />
              </div>

              <div className="mb-4">
                <button
                  onClick={() => setExpandedFilters(!expandedFilters)}
                  className="flex items-center text-slate-700 font-medium"
                >
                  <Filter size={18} className="mr-2" />
                  Filters
                  {expandedFilters ? (
                    <ChevronUp size={18} className="ml-2" />
                  ) : (
                    <ChevronDown size={18} className="ml-2" />
                  )}
                </button>

                {expandedFilters && (
                  <div className="mt-3 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Status
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "All",
                          "Pending",
                          "In Progress",
                          "In Review",
                          "Resolved",
                          "Completed",
                        ].map((status) => (
                          <button
                            key={status}
                            onClick={() =>
                              setStatusFilter(status === "All" ? null : status)
                            }
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              statusFilter === status ||
                              (status === "All" && statusFilter === null)
                                ? "bg-sky-100 text-sky-800 border border-sky-300"
                                : "bg-slate-100 text-slate-700 border border-transparent hover:border-slate-300"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["All", "Issue", "Report", "Voice"].map((type) => (
                          <button
                            key={type}
                            onClick={() =>
                              setTypeFilter(type === "All" ? null : type)
                            }
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              typeFilter === type ||
                              (type === "All" && typeFilter === null)
                                ? "bg-sky-100 text-sky-800 border border-sky-300"
                                : "bg-slate-100 text-slate-700 border border-transparent hover:border-slate-300"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <div
                      key={report.id}
                      onClick={() => setSelectedReport(report)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedReport?.id === report.id
                          ? "border-sky-300 bg-sky-50"
                          : "border-slate-200 hover:border-sky-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-slate-800">
                          {report.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            report.status
                          )}`}
                        >
                          {report.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500 mb-2">
                        <span>{report.id}</span>
                        <span>{report.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            report.type
                          )}`}
                        >
                          {report.type}
                        </span>
                        <button className="text-sky-600 hover:text-sky-800 text-sm flex items-center">
                          <Eye size={14} className="mr-1" />
                          View
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search size={24} className="text-slate-400" />
                    </div>
                    <h3 className="text-slate-700 font-medium mb-1">
                      No reports found
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedReport ? (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-slate-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-1">
                        {selectedReport.title}
                      </h2>
                      <div className="flex items-center text-slate-500 text-sm">
                        <span className="mr-3">{selectedReport.id}</span>
                        <span>{selectedReport.date}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        selectedReport.status
                      )}`}
                    >
                      {selectedReport.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-slate-500">Type</div>
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${getTypeColor(
                          selectedReport.type
                        )}`}
                      >
                        {selectedReport.type}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Priority</div>
                      <div
                        className={`font-medium mt-1 ${getPriorityColor(
                          selectedReport.priority
                        )}`}
                      >
                        {selectedReport.priority}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Assignee</div>
                      <div className="font-medium text-slate-800 mt-1">
                        {selectedReport.assignee}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-slate-500 mb-2">
                      Description
                    </div>
                    <p className="text-slate-700">
                      {selectedReport.description}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <MessageSquare size={18} className="mr-2" />
                    Activity Log
                  </h3>

                  <div className="space-y-4">
                    {selectedReport.updates.map((update, index) => (
                      <div key={index} className="relative pl-6 pb-4">
                        {index !== selectedReport.updates.length - 1 && (
                          <div className="absolute top-2 left-2 bottom-0 w-0.5 bg-slate-200"></div>
                        )}
                        <div className="absolute top-2 left-0 w-4 h-4 rounded-full bg-sky-500"></div>
                        <div className="text-xs text-slate-500 mb-1">
                          {update.date}
                        </div>
                        <div className="text-sm font-medium text-slate-700 mb-1">
                          {update.user}
                        </div>
                        <div className="text-slate-600">{update.message}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-l-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                      />
                      <button className="px-4 py-2 bg-sky-600 text-white rounded-r-lg hover:bg-sky-700 transition-colors">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <ClipboardList size={32} className="text-slate-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  Select a Report
                </h2>
                <p className="text-slate-600 max-w-md">
                  Choose a report from the list to view its details, status
                  updates, and activity log.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
