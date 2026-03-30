import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// --- DATA ARRAYS ---

const EXPERIENCE_DATA = [
  {
    company: "Edgewater Markets",
    title: "Software Engineering Intern",
    dates: "Aug 2024 - Jan 2025",
    description: [
      "Traded in G10 currency pairs.",
      "Developed and executed code to run back-end tests.",
      "Created scripts for parsing logs to support trading infrastructure."
    ]
  },
  {
    company: "Kamba",
    title: "Software Engineering Intern (Remote)",
    dates: "Summer 2022",
    description: [
      "Utilized web scraping tools to extract structured data.",
      "Organized and formatted raw data into parsable formats for analysis."
    ]
  },
  {
    company: "Putnam and Vine",
    title: "Staff",
    dates: "June 2022",
    description: [
      "Utilized web scraping tools to organize data into parsable formats."
    ]
  }
]

const PROJECTS_DATA = [
  {
    name: "Connect 4 Min-Max Algorithm",
    tech: ["Python", "Selenium"],
    description: "Developed a Min-Max algorithm to play Connect 4 integrated with a Selenium-based website interface."
  },
  {
    name: "Data Scraping Utilities",
    tech: ["XPath", "Octoparse", "Parsehub"],
    description: "Built automated XPath-based web scraping pipelines to extract and format large datasets."
  },
  {
    name: "Personal Website",
    tech: ["Node.js", "React", "Tailwind", "Vite","Shadcn UI"],
    description: "Built a personal website using modern web technologies."
  }
]

const EDUCATION_DATA = [
  {
    institution: "Rensselaer Polytechnic Institute (RPI)",
    location: "Troy, NY",
    dates: "2024 - Present",
    description: [
      "Relevant Coursework: Data Structures and Algorithms, Multivariable Calculus.",
      "Active contributor to open-source initiatives."
    ]
  },
  {
    institution: "University of Connecticut",
    location: "Stamford, CT",
    dates: "Feb 2023 - Aug 2023",
    description: [
      "Non-Degree Student. Completed relevant foundational coursework."
    ]
  }
]

// --- UI COMPONENT ---

export default function Resume() {
  return (
    <div className="mx-auto max-w-4xl p-6 md:p-12 animate-in fade-in duration-500 space-y-12">
      
      {/* Header */}
      <header>
        <h1 className="text-2xl font-mono tracking-tighter border-b border-neutral-800 pb-2 flex items-center gap-3">
          ~/RESUME
        </h1>
        <p className="mt-4 text-neutral-400 text-sm">
          Software Engineer. 35 ACT. Fluent in English and Spanish. 
        </p>
      </header>

      {/* Experience Section */}
      <section className="space-y-4">
        <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Experience</h2>
        <div className="space-y-6">
          {EXPERIENCE_DATA.map((job, index) => (
            <Card key={index} className="border-l-2 border-l-lime-400 border-y-0 border-r-0 bg-transparent rounded-none shadow-none pl-6 py-2">
              <CardHeader className="p-0 pb-2 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-neutral-100 font-medium">{job.company}</CardTitle>
                  <p className="text-sm text-neutral-500">{job.title}</p>
                </div>
                <span className="text-xs font-mono text-neutral-500">{job.dates}</span>
              </CardHeader>
              <CardContent className="p-0 text-sm text-neutral-400 leading-relaxed">
                <ul className="list-disc pl-4 space-y-1 marker:text-neutral-700">
                  {job.description.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="space-y-4">
        <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS_DATA.map((project, index) => (
            <Card key={index} className="border border-neutral-800 bg-neutral-900/30 p-4 rounded-md shadow-none hover:border-neutral-700 transition-colors">
              <div className="space-y-2">
                <h3 className="text-base text-neutral-100 font-medium">{project.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-[10px] font-mono text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-neutral-400">{project.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="space-y-4 border-t border-neutral-800 pt-8">
        <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Education</h2>
        <div className="space-y-6">
          {EDUCATION_DATA.map((edu, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <div className="flex justify-between items-start">
                <h3 className="text-base text-neutral-100 font-medium">{edu.institution}</h3>
                <span className="text-xs font-mono text-neutral-500">{edu.dates}</span>
              </div>
              <p className="text-sm text-neutral-500">{edu.location}</p>
              <ul className="list-disc pl-4 space-y-1 mt-2 text-sm text-neutral-400 marker:text-neutral-700">
                {edu.description.map((bullet, bulletIndex) => (
                  <li key={bulletIndex}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="space-y-4 border-t border-neutral-800 pt-8">
        <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Technical Stack</h2>
        <div className="flex flex-wrap gap-2">
          {["C++", "Python", "JavaScript", "React", "Node.js", "HTML", "CSS", "Vite", "Tailwind"].map((skill) => (
            <Badge key={skill} variant="outline" className="border-neutral-700 text-neutral-300 font-mono text-xs hover:border-lime-400 hover:text-lime-400 transition-colors">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

    </div>
  )
}