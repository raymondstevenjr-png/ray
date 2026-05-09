export default function FounderSection() {
  return (
    <section className="py-20 md:py-28 bg-brand-green text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Built by someone from the community
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Photo placeholder */}
          <div className="flex-shrink-0">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "3px solid rgba(255,255,255,0.3)",
                color: "white",
              }}
            >
              RS
            </div>
          </div>

          {/* Quote */}
          <div>
            <blockquote className="text-lg md:text-xl text-green-100 leading-relaxed mb-6">
              I grew up in Bo, Sierra Leone. I have watched Sierra Leonean
              business owners in the US work incredibly hard — braiding hair for
              12 hours, cooking for events all weekend, cleaning homes back to
              back. They build real businesses with real customers. And they lose
              those customers every time they cannot answer the phone. I built
              SaloneSeva to fix that.
            </blockquote>
            <div className="flex items-center gap-3">
              <div
                className="w-px h-8"
                style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
              />
              <div>
                <div className="font-bold text-white text-lg">
                  Raymond Steven
                </div>
                <div className="text-green-200 text-sm">
                  Founder, SaloneSeva · Bo, Sierra Leone
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
