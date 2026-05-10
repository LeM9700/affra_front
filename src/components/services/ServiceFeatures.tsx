interface Feature {
  title: string
  description: string
  icon?: string
}

interface ServiceFeaturesProps {
  features: Feature[]
}

export default function ServiceFeatures({ features }: ServiceFeaturesProps) {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-[#5BBF8A]/50 hover:shadow-sm transition-all">
              {f.icon && <div className="text-2xl mb-3">{f.icon}</div>}
              <h3 className="text-slate-900 font-bold mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
