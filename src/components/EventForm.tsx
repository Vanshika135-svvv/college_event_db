import { useState } from "react";
import { toast } from "sonner";
import { Calendar, MapPin, FileText, Tag, Send, Sparkles } from "lucide-react";
import BackgroundAnimation from "./BackgroundAnimation";
import "./EventForm.css";

const EventForm = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 1. Gather Data from form
    const form = e.currentTarget;
    const formData = {
        name: (form.elements.namedItem('event-name') as HTMLInputElement).value,
        date: (form.elements.namedItem('event-date') as HTMLInputElement).value,
        location: (form.elements.namedItem('event-location') as HTMLInputElement).value,
        description: (form.elements.namedItem('event-description') as HTMLTextAreaElement).value,
        category: (form.elements.namedItem('event-category') as HTMLSelectElement).value,
    };

    try {
        // 2. Send Data to Server
        const response = await fetch('http://localhost:5000/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            toast.success("🎉 Event saved to Database!", {
                description: "Your event is now live in the system.",
            });
            form.reset();
        } else {
            toast.error("Failed to save event.");
        }
    } catch (error) {
        console.error(error);
        toast.error("Server connection error.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 relative">
      <BackgroundAnimation variant="form" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full mb-4 animate-stagger-item">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Create Your Event</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4 animate-stagger-item animation-delay-100">
            Bring Your Event to Life
          </h2>
          <p className="text-xl text-gray-600 animate-stagger-item animateStaggerItemWithDelay">
            Share your event with the campus community in just a few clicks
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-violet-100 form-card-hover animate-stagger-item form-card-delay">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Event Name */}
            <div className="relative">
              <label htmlFor="event-name" className={`flex items-center gap-2 text-sm font-semibold mb-2 transition-colors ${focusedField === 'event-name' ? 'text-violet-700' : 'text-gray-700'}`}>
                <Sparkles className="w-4 h-4" /> Event Name
              </label>
              <input type="text" id="event-name" className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-0 focus:border-violet-500 transition-all duration-300 text-gray-900 font-medium input-focus-glow" placeholder="e.g., Annual Tech Fest 2026" required onFocus={() => setFocusedField('event-name')} onBlur={() => setFocusedField(null)} />
            </div>

            {/* Date and Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="event-date" className={`flex items-center gap-2 text-sm font-semibold mb-2 transition-colors ${focusedField === 'event-date' ? 'text-violet-700' : 'text-gray-700'}`}>
                  <Calendar className="w-4 h-4" /> Event Date
                </label>
                <input type="date" id="event-date" className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-0 focus:border-violet-500 transition-all duration-300 text-gray-900 font-medium input-focus-glow" required onFocus={() => setFocusedField('event-date')} onBlur={() => setFocusedField(null)} />
              </div>
              
              <div className="relative">
                <label htmlFor="event-location" className={`flex items-center gap-2 text-sm font-semibold mb-2 transition-colors ${focusedField === 'event-location' ? 'text-violet-700' : 'text-gray-700'}`}>
                  <MapPin className="w-4 h-4" /> Location
                </label>
                <input type="text" id="event-location" className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-0 focus:border-violet-500 transition-all duration-300 text-gray-900 font-medium input-focus-glow" placeholder="e.g., Auditorium Hall B" required onFocus={() => setFocusedField('event-location')} onBlur={() => setFocusedField(null)} />
              </div>
            </div>

            {/* Description */}
            <div className="relative">
              <label htmlFor="event-description" className={`flex items-center gap-2 text-sm font-semibold mb-2 transition-colors ${focusedField === 'event-description' ? 'text-violet-700' : 'text-gray-700'}`}>
                <FileText className="w-4 h-4" /> Event Description
              </label>
              <textarea id="event-description" rows={5} className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-0 focus:border-violet-500 transition-all duration-300 text-gray-900 resize-none input-focus-glow" placeholder="Tell us about your event... What makes it special?" onFocus={() => setFocusedField('event-description')} onBlur={() => setFocusedField(null)} />
            </div>

            {/* Category */}
            <div className="relative">
              <label htmlFor="event-category" className={`flex items-center gap-2 text-sm font-semibold mb-2 transition-colors ${focusedField === 'event-category' ? 'text-violet-700' : 'text-gray-700'}`}>
                <Tag className="w-4 h-4" /> Event Category
              </label>
              <select id="event-category" className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-0 focus:border-violet-500 transition-all duration-300 text-gray-900 font-medium appearance-none bg-white cursor-pointer input-focus-glow select-with-icon" required onFocus={() => setFocusedField('event-category')} onBlur={() => setFocusedField(null)}>
                <option value="">Select a category...</option>
                <option value="academic">📚 Academic</option>
                <option value="sport">⚽ Sports</option>
                <option value="cultural">🎭 Cultural</option>
                <option value="other">✨ Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-violet-600 via-violet-700 to-purple-700 text-white font-bold py-5 rounded-xl transition-all duration-300 shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden group gradient-animated disabled:opacity-70">
                <span className="relative z-10 flex items-center gap-3">
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Saving Event...' : 'Submit Event for Approval'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventForm;