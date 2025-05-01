import Link from "next/link"
import { ArrowRight, FileText, Mic, AlertCircle, ClipboardList } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-800">ReportFlow</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Streamlined Report Management</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Submit and track your reports with ease. Multiple ways to report issues and monitor their status.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/text-report" className="group">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 h-full border border-slate-100 hover:border-emerald-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Type Report</h3>
              <p className="text-slate-600 mb-4">
                Submit detailed reports using our text editor with formatting options.
              </p>
              <div className="flex items-center text-emerald-600 font-medium group-hover:translate-x-1 transition-transform">
                Get started <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
          </Link>

          <Link href="/voice-report" className="group">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 h-full border border-slate-100 hover:border-violet-200">
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                <Mic className="text-violet-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Record Voice</h3>
              <p className="text-slate-600 mb-4">
                Record audio reports when you're on the go or prefer speaking over typing.
              </p>
              <div className="flex items-center text-violet-600 font-medium group-hover:translate-x-1 transition-transform">
                Start recording <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
          </Link>

          <Link href="/submit-issue" className="group">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 h-full border border-slate-100 hover:border-amber-200">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <AlertCircle className="text-amber-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Submit Issue</h3>
              <p className="text-slate-600 mb-4">Report bugs, problems, or incidents that need immediate attention.</p>
              <div className="flex items-center text-amber-600 font-medium group-hover:translate-x-1 transition-transform">
                Report issue <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
          </Link>

          <Link href="/report-status" className="group">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 h-full border border-slate-100 hover:border-sky-200">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                <ClipboardList className="text-sky-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Report Status</h3>
              <p className="text-slate-600 mb-4">
                Track the progress of your submitted reports and view their current status.
              </p>
              <div className="flex items-center text-sky-600 font-medium group-hover:translate-x-1 transition-transform">
                View status <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
          </Link>
        </div>

        <section className="mt-16 bg-white rounded-xl shadow-md p-8 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Recent Reports</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-800">#1234</td>
                  <td className="py-3 px-4 text-slate-800">Network outage in Building B</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                      Issue
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">May 1, 2025</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                      Resolved
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-800">#1233</td>
                  <td className="py-3 px-4 text-slate-800">Quarterly safety inspection</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                      Report
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Apr 28, 2025</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-sky-100 text-sky-800 rounded-full text-xs font-medium">
                      In Review
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-800">#1232</td>
                  <td className="py-3 px-4 text-slate-800">Equipment malfunction</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-violet-100 text-violet-800 rounded-full text-xs font-medium">
                      Voice
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Apr 27, 2025</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
