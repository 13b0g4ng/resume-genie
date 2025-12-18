import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Target, Zap, TrendingUp, Users, Award, ArrowRight, Sparkles } from "lucide-react";

const stats = [
  { value: "94%", label: "Interview Success Rate", description: "Users who landed interviews within 30 days" },
  { value: "3x", label: "More Callbacks", description: "Compared to traditional resumes" },
  { value: "87%", label: "ATS Pass Rate", description: "Resumes that pass automated screening" },
  { value: "50K+", label: "Resumes Created", description: "Professionals trust our platform" },
];

const features = [
  {
    icon: Zap,
    title: "AI-Powered Content",
    description: "Smart suggestions for bullet points, skills, and achievements tailored to your industry."
  },
  {
    icon: Target,
    title: "ATS Optimization",
    description: "Beat applicant tracking systems with keyword optimization and proper formatting."
  },
  {
    icon: TrendingUp,
    title: "Job Match Analysis",
    description: "See how well your resume matches specific job descriptions and get improvement tips."
  },
  {
    icon: Sparkles,
    title: "Professional Templates",
    description: "Choose from elegant, modern designs that stand out while remaining professional."
  },
];

const testimonials = [
  {
    quote: "I got 5 interview calls in my first week after using this resume builder. The ATS optimization really works!",
    author: "Sarah M.",
    role: "Marketing Manager"
  },
  {
    quote: "The AI suggestions helped me articulate my achievements in ways I never thought of. Landed my dream job!",
    author: "James L.",
    role: "Software Engineer"
  },
  {
    quote: "After months of silence, I finally started getting responses. This tool is a game-changer.",
    author: "Emily R.",
    role: "Product Designer"
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">R</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground">ResumeAI</span>
          </div>
          <Link to="/builder">
            <Button variant="gold" size="sm">
              Create Resume
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">#1 AI Resume Builder for Job Seekers</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Land Your Dream Job<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              94% Faster
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Create ATS-optimized, professionally crafted resumes in minutes. 
            Our AI analyzes job descriptions and tailors your resume for maximum impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/builder">
              <Button variant="gold" size="lg" className="text-lg px-8">
                Build Your Resume Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="glass" size="lg" className="text-lg px-8">
              See How It Works
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>AI-powered suggestions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Export to PDF & DOCX</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Proven Results That Speak for Themselves
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join thousands of professionals who've transformed their job search with our AI-powered resume builder.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-background/50 border border-border hover:border-primary/30 transition-colors">
                <div className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                  {stat.value}
                </div>
                <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                Why Your Resume is <span className="text-primary">Make or Break</span>
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg">
                  <strong className="text-foreground">75% of resumes never reach human eyes.</strong> Applicant Tracking Systems (ATS) filter out candidates before recruiters even see them.
                </p>
                <p>
                  The average recruiter spends just <strong className="text-foreground">6-7 seconds</strong> scanning a resume. 
                  Every word, every format choice, every keyword matters.
                </p>
                <p>
                  In today's competitive job market, a generic resume isn't just ineffective—it's invisible. 
                  You need a resume that's optimized for both machines AND humans.
                </p>
              </div>
              
              <div className="mt-8 space-y-4">
                {[
                  "98% of Fortune 500 companies use ATS",
                  "Tailored resumes are 40% more likely to get interviews",
                  "Keywords from job descriptions increase match rates by 60%"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <div className="relative bg-card border border-border rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/10 flex items-center justify-center">
                    <span className="text-2xl">📉</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Without Optimization</div>
                    <div className="text-sm text-muted-foreground">Generic resume approach</div>
                  </div>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ATS Score</span>
                    <span className="text-red-400">23%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[23%] bg-red-500 rounded-full" />
                  </div>
                </div>
                
                <div className="h-px bg-border my-6" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">With ResumeAI</div>
                    <div className="text-sm text-muted-foreground">AI-optimized resume</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ATS Score</span>
                    <span className="text-primary">94%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[94%] bg-gradient-to-r from-primary to-accent rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Everything You Need to Stand Out
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our AI-powered tools give you an unfair advantage in the job market.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-muted-foreground">
              Real results from real job seekers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary">★</span>
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold text-sm">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Join 50,000+ successful job seekers</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Your Dream Job is One Resume Away
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Don't let an unoptimized resume hold you back. Start building your 
            ATS-friendly, professionally crafted resume in minutes.
          </p>
          
          <Link to="/builder">
            <Button variant="gold" size="lg" className="text-lg px-10">
              Create Your Resume Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground mt-6">
            Free to start • No credit card required • Export anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">R</span>
            </div>
            <span className="font-display text-sm text-muted-foreground">ResumeAI © 2024</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
