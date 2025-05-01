"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Mic, Square, Send, Play, Pause } from "lucide-react"

export default function VoiceReport() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudioBlob(audioBlob)
        setAudioUrl(audioUrl)

        // Stop all tracks of the stream
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Unable to access your microphone. Please check your browser permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!audioBlob) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // Reset form
      setTitle("")
      setCategory("")
      setAudioBlob(null)
      setAudioUrl(null)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-slate-600 hover:text-slate-800 mr-4">
              <ArrowLeft size={20} className="mr-1" />
              <span>Back</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">Voice Report</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {isSubmitted ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-violet-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Voice Report Submitted!</h2>
            <p className="text-slate-600 mb-6">Your voice report has been received and is being processed.</p>
            <div className="flex justify-center gap-4">
              <Link
                href="/report-status"
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                View Status
              </Link>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                New Recording
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Record Voice Report</h2>

            <div className="mb-8">
              <div className="bg-violet-50 rounded-xl p-8 text-center">
                {!audioBlob ? (
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${isRecording ? "bg-red-100 animate-pulse" : "bg-violet-100"}`}
                    >
                      {isRecording ? (
                        <Square className="text-red-600 cursor-pointer" size={32} onClick={stopRecording} />
                      ) : (
                        <Mic className="text-violet-600 cursor-pointer" size={32} onClick={startRecording} />
                      )}
                    </div>

                    {isRecording ? (
                      <div>
                        <div className="text-red-600 font-semibold text-xl mb-1">Recording...</div>
                        <div className="text-slate-600">{formatTime(recordingTime)}</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-slate-800 font-semibold text-xl mb-1">Tap to Start Recording</div>
                        <div className="text-slate-600">Speak clearly into your microphone</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-md mb-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-violet-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-slate-800 font-medium">Recording</div>
                          <div className="text-slate-500 text-sm">{formatTime(recordingTime)}</div>
                        </div>

                        <div className="relative h-12 bg-violet-100 rounded-lg overflow-hidden mb-2">
                          <div className="absolute inset-0 flex items-center justify-center">
                            {Array.from({ length: 50 }).map((_, i) => (
                              <div
                                key={i}
                                className="w-1 mx-0.5 bg-violet-400 opacity-70"
                                style={{
                                  height: `${Math.random() * 100}%`,
                                  opacity: isPlaying ? 0.7 : 0.3,
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <button
                            onClick={togglePlayback}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                          >
                            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                          </button>
                        </div>

                        {audioUrl && (
                          <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} className="hidden" />
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setAudioBlob(null)
                        setAudioUrl(null)
                      }}
                      className="text-violet-600 hover:text-violet-800 text-sm font-medium"
                    >
                      Discard and record again
                    </button>
                  </div>
                )}
              </div>
            </div>

            {audioBlob && (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                    Report Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                    placeholder="Enter a descriptive title"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="safety">Safety</option>
                    <option value="security">Security</option>
                    <option value="it">IT Issues</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Voice Report
                        <Send size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
