import { createFileRoute } from "@tanstack/react-router";
import { canonicalLink } from "@/lib/seo";
import { CTABand, LinkedInIcon, PageHero, Section, SectionHead } from "@/components/site";
import { FadeIn } from "@/components/motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About VistaXM | Revenue Channel Intelligence" },
      {
        name: "description",
        content:
          "VistaXM is a Revenue Channel Intelligence company led by Erik Vogel (formerly Qualtrics, HPE, Cisco). Meet the team turning customer experience into revenue.",
      },
      { property: "og:title", content: "About VistaXM | Revenue Channel Intelligence" },
      {
        property: "og:description",
        content:
          "Operators who built customer experience at scale. We became the team the mid-market and the channel never had.",
      },
    ],
    links: [canonicalLink("/about")],
  }),
  component: About,
});

/* ---------------- Shared bio modal ---------------- */

// Full bios are sourced verbatim from vistaxm.com/company/leadership/ and opened
// from the "Read bio" trigger on each card, matching the source site's modal UX.
function AvatarBlock({
  name,
  initials,
  photo,
  size = "h-20 w-20",
}: {
  name: string;
  initials: string;
  photo?: string;
  size?: string;
}) {
  return photo ? (
    <img
      src={photo}
      alt={name}
      loading="lazy"
      className={`${size} flex-none rounded-full object-cover ring-2 ring-[color:var(--blue-cta)] ring-offset-2 ring-offset-white`}
    />
  ) : (
    <span
      aria-hidden
      className={`flex ${size} flex-none items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--navy-deep)] to-[color:var(--blue-cta)] text-xl font-semibold tracking-wide text-white ring-2 ring-[color:var(--blue-cta)] ring-offset-2 ring-offset-white`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {initials}
    </span>
  );
}

function BioModal({
  name,
  title,
  initials,
  photo,
  bio,
  triggerLabel = "Read bio",
}: {
  name: string;
  title: string;
  initials: string;
  photo?: string;
  bio: string[];
  triggerLabel?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Read ${name}'s bio`}
          className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[color:var(--blue-link)] transition-colors hover:text-[color:var(--blue-cta)]"
        >
          {triggerLabel}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path d="M5 12h13M13 6l6 6-6 6" />
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 md:p-10">
        <DialogHeader>
          <div className="flex items-center gap-5">
            <AvatarBlock name={name} initials={initials} photo={photo} size="h-24 w-24" />
            <div className="text-left">
              <DialogTitle className="text-2xl font-semibold text-[color:var(--ink)]">
                {name}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm font-semibold uppercase tracking-wide text-[color:var(--blue-link)]">
                {title}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-2 space-y-4 text-left leading-relaxed text-[color:var(--ink-soft)]">
          {bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Leadership ---------------- */

// One-line taglines come from the client brief; full bios are sourced verbatim
// from vistaxm.com. Bruce's tagline is derived from his bio pending client copy.
const LEADERS: {
  name: string;
  title: string;
  tagline: string;
  initials: string;
  photo?: string;
  bio: string[];
  linkedin?: string;
}[] = [
  {
    name: "Erik Vogel",
    title: "Chief Executive Officer",
    tagline:
      "We listen relentlessly, innovate boldly, and shape experiences that customers remember.",
    initials: "EV",
    photo: "/images/team/erik-vogel.avif",
    linkedin: "https://www.linkedin.com/in/erikvogel2020/",
    bio: [
      "Erik Vogel is the Chief Executive Officer of VistaXM, Inc. He spearheads the company's global go-to-market strategy and revenue growth, with VistaXM's sales, operations, and product management functions reporting directly to him.",
      "Erik is a seasoned global executive with more than 30 years' experience across the technology and services industries. He has a proven track record of success and a relentless drive for innovation, customer satisfaction, and continuous improvement. Erik previously served as Senior Vice President & Global Head of High-Tech, Telco, and Media at a leading experience-management software company.",
      "Prior to that, Erik held multiple senior leadership positions at HPE, Inc, a multinational information technology leader, including Global Vice President of Customer Experience and Global Vice President of Software Defined and Cloud Center of Excellence. Earlier in his career Erik held leadership roles with Cisco.",
      "Erik graduated with an MBA from Carnegie-Mellon University and Juris Doctorate from University of Pittsburgh School of Law. Before that, he received a Bachelor of Science in Mechanical Engineering from Villanova University.",
    ],
  },
  {
    name: "Paul Barr",
    title: "Chief Revenue Officer",
    tagline:
      "87% of companies say they provide excellent CX yet only 11% of customers agree. Which side is your company on?",
    initials: "PB",
    photo: "/images/team/paul.avif",
    bio: [
      "Paul Barr is the Chief Revenue Officer of VistaXM, Inc and is responsible for customer acquisition and revenue generation. With 25+ years of experience in operations, business development and sales across Fortune 50, channel and start-up organizations, Paul is driving the go-to-market strategy and enabling VistaXM's growth.",
      "Paul is a builder at heart. From his personal hobbies to his professional life, he has been instrumental in developing many early stage companies and helping them get to the next level. Paul embraces disruptive technology and challenging the status quo. As a result, he has helped numerous organizations transform their operations and become a trusted advisor. His teams operate with integrity, passion and focus on doing the right thing for the customer.",
      "Prior to joining VistaXM, he developed Fungible's worldwide channel organization. He has also held leadership positions at multiple channel organizations and Intel.",
    ],
  },
  {
    name: "Alexey Gerasimov",
    title: "Chief Operating Officer",
    tagline:
      "Behind every unforgettable customer experience is flawless execution and a united team.",
    initials: "AG",
    photo: "/images/team/alexey-gerasimov.avif",
    bio: [
      "Alexey Gerasimov is the Chief Operating Officer of VistaXM, Inc and is responsible for the Services and Delivery organization. With 30+ years of Consulting and Professional Services experience across various industries, Alexey is the key driver behind VistaXM's ability to deliver impactful outcomes to our clients.",
      "Alexey has a distinguished career scaling and operating successful organizations and driving digital transformations for some of the world's biggest brands and enterprises. He is both a seasoned entrepreneur and an experienced senior leader in Fortune 500 companies. Alexey uses his deep knowledge and passion for technology to help organizations pragmatically drive digital transformation initiatives that produce a strong and lasting impact on their business.",
      "Prior to joining VistaXM, Alexey led North American Cloud organization for Capgemini's CIS Global Business Line. Before Capgemini, Alexey held senior leadership roles at HPE, Cloud Technology Partners, and MoFuse.",
      "Alexey graduated with a Bachelor of Science in Computer Science from Hartwick College.",
    ],
  },
  {
    name: "Bruce Coughlin",
    title: "Chief Growth Officer",
    tagline: "The differentiator isn't the technology; it's the team you build around it.",
    initials: "BC",
    photo: "/images/team/bruce-coughlin.jpg",
    bio: [
      "Bruce has proven to be an expert leader and team builder with deep expertise in growing and scaling businesses in key technology sectors. He provides a strong balance of skills with strategic foresight combined with the ability to build out teams for scale. He brings practical entrepreneurial experience that has resulted in building great leaders, teams and companies.",
      "As a hands-on leader throughout his career, he has experience in both public and private companies, such as Siemens and Cloud Technology Partners (CTP). He has worked in driving innovation to take advantage of some of the major technology trends including IT Outsourcing, Cloud Computing, Cybersecurity and, now, AI. Bruce has been responsible for all aspects of building and managing companies including Sales/GTM/Marketing, Service Delivery, IP Development, Operations, Corporate Functions and Fundraising/Investor Relationships.",
      "At CTP, Bruce built the premier cloud services organizations in the US, leading to a successful exit with Hewlett-Packard Enterprise. He has built and deployed leading-edge portfolio capabilities across an array of services companies on a global basis.",
      "Bruce graduated from Bucknell University and currently advises several leading technology and services companies.",
    ],
  },
  {
    name: "Alan Zall",
    title: "Chief Technology Officer",
    tagline: "We build platforms that empower real connections between brands and people.",
    initials: "AZ",
    photo: "/images/team/alan-zall.avif",
    bio: [
      "Alan Zall is the Chief Technology Officer at VistaXM, Inc., overseeing the Product and Engineering organization. With over 30 years of experience in Product and Professional Services across various industries, he leads the delivery of VistaXM's AI-enabled platform and supporting technologies that enhance collaboration and insight analysis.",
      "Throughout his career, Alan has successfully scaled and operated technology organizations, driving digital innovation for brands and enterprises. He combines deep technical expertise with strong business acumen to deliver products that exceed expectations.",
      "Before joining VistaXM, Alan served as the Global CPTO at CSpace and held senior leadership roles at HPE, Cloud Technology Partners, and Fiserv. He holds a Master of Science in Computer Science from the University of Vermont.",
    ],
  },
  {
    name: "Candice A. Vogel",
    title: "Chief Legal Officer",
    tagline:
      "Trust is earned through integrity; every promise and every policy matters to our customers.",
    initials: "CV",
    photo: "/images/team/candice-vogel.webp",
    bio: [
      "Candice A. Vogel is the Chief Legal Officer of VistaXM, Inc. She is responsible for all legal, administrative, and compliance aspects of the business.",
      "Candice is a seasoned attorney with commercial and employment litigation and employment law experience, including advising clients of all sizes regarding federal and state employment laws and representing employers in federal, state and administrative proceedings. Candice has experience in numerous areas of employment law, including the Age Discrimination in Employment Act, the Americans with Disabilities Act, the Fair Labor Standards Act, the Family Medical Leave Act, Title VII discrimination based on sex, race, religion, pregnancy and national origin, state law wrongful termination, and employment-related state law tort claims.",
      "Candice has extensive speaking experience, advising human resources personnel, managers and employees on matters such as prevention of harassment and discrimination in the workplace, compliance with state and federal employment laws, employee handbooks and how to avoid employment related lawsuits.",
      "Candice graduated with Juris Doctorate degree from the University of Pittsburgh School of Law and served as a judicial clerk to the Honorable J. Thomas Greene, United States District Court for the District of Utah.",
    ],
  },
];

function LeaderProfileCard({
  name,
  title,
  tagline,
  initials,
  photo,
  bio,
  delay = 0,
}: {
  name: string;
  title: string;
  tagline: string;
  initials: string;
  photo?: string;
  bio: string[];
  delay?: number;
}) {
  return (
    <FadeIn delay={delay} className="h-full">
      <div className="group relative flex h-full flex-col rounded-2xl hairline bg-white p-8 md:p-9 card-lift">
        <div className="flex items-center gap-5">
          <AvatarBlock name={name} initials={initials} photo={photo} />
          <div>
            <h3 className="text-xl font-semibold text-[color:var(--ink)]">{name}</h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[color:var(--blue-link)]">
              {title}
            </p>
          </div>
        </div>

        <blockquote className="mt-6 text-[1.0625rem] italic leading-relaxed text-[color:var(--ink)]">
          <span aria-hidden className="mr-1 text-[color:var(--orange-pop)]">
            &ldquo;
          </span>
          {tagline}
          <span aria-hidden className="ml-0.5 text-[color:var(--orange-pop)]">
            &rdquo;
          </span>
        </blockquote>

        <div className="mt-auto pt-7">
          <BioModal name={name} title={title} initials={initials} photo={photo} bio={bio} />
        </div>
      </div>
    </FadeIn>
  );
}

/* ---------------- Advisors ---------------- */

const ADVISORS: {
  name: string;
  title: string;
  initials: string;
  photo?: string;
  bio: string[];
}[] = [
  {
    name: "Terry Richardson",
    title: "Technology Executive and Board Advisor",
    initials: "TR",
    photo: "/images/team/tr.jpg",
    bio: [
      "Terry Richardson is an accomplished technology executive, with well-proven performance results delivered during his 40+ year technology career. His expertise is in go-to-market strategy development and execution, sales & channel management, and ecosystem alignment. Terry has worked for some of the leading companies in the technology industry, and has achieved success in both public and private organizations. He demonstrated keen focus on exceeding goals, and has the rare ability to think strategically and execute with operational excellence.",
      "Most recently, Terry served as CRO for Blue Mantis, a PE-backed solution provider that has achieved rapid growth through a consistent focus on organic and inorganic GTM initiatives. He previously held senior leadership roles at Advanced Micro Devices, HP/HPE, SEPATON, and EMC/Data General. His sales leadership experience spans both customer-facing and partner-facing assignments.",
      "Terry delights in developing teams and in taking on new challenges to help grow and scale businesses. He has recently formed an advisory and consulting company to share his expertise with others across the technology industry. He is a 1985 graduate of Boston College Carroll School of Management and has put that education to good use.",
    ],
  },
  {
    name: "Andy Youniss",
    title: "Executive Chairman, Rocket Software",
    initials: "AY",
    photo: "/images/team/andy-youniss.webp",
    bio: [
      "Andy Youniss is a founder of Rocket Software, the former president and CEO, and currently serves as the company's Executive Chairman. He has been the guiding force behind Rocket's innovation, partnerships, strategy, culture, and values since the company launched in 1990. For over 35 years, Rocket has differentiated itself by delivering innovative software that matters, exceptional experiences and outcomes to their customers and partners, and living the company's core values of empathy, humanity, trust, and love.",
    ],
  },
  {
    name: "Abhi Ingle",
    title: "Executive, passionate business builder",
    initials: "AI",
    photo: "/images/team/abhi-ingle.avif",
    bio: [
      "Abhi Ingle is a passionate business builder. He has a knack for spotting an opportunity, painting a vision and mobilizing an empowered team to go after it. He has scaled multiple businesses over his career and was most recently at a leading experience-management software company, where he was recruited as part of the pre-IPO executive leadership to scale and take the company public. Abhi built three billion-dollar businesses at AT&T and has over 25 years of operating experience as a senior executive with a specialization in the business to business arena in go-to-market functions across sales, marketing, product and partnerships. He has worked at companies at various stages of development, from startups to F10 companies. Abhi lives by the core principles of investing in people and partnerships. He has mentored hundreds of individuals over the years and built win-win partnerships with multiple companies that his teams took to market.",
      "Abhi began his career at McKinsey & Co consulting to Software, Technology and Financial services companies and then transitioned to product and marketing leadership roles at Silicon valley startups before moving to AT&T and a leading experience-management software company.",
      "Abhi has a BA in Computer Science and Mathematics with high honors from Oberlin College and a MBA with distinction from Harvard Business School. He currently serves on the boards of Morae, a legal industry focused tech-enabled services company (Houston), iCode, a STEM education startup (Dallas), board advisor to FleetComplete, a fleet management IoT/SaaS provider (Toronto, Canada). Abhi serves on the Executive board of Dallas AI and was named to the Dallas AI 75.",
    ],
  },
  {
    name: "Kristina Bourke",
    title: "President & GM, TPA, Personify Health",
    initials: "KB",
    photo: "/images/team/kristina-bourke-tan.avif",
    bio: [
      "Kristina Bourke serves as the President & GM, TPA, Personify Health and brings deep experience leading tech-enabled businesses.",
      "Prior to joining Personify Health, Kristina was the Executive Vice President with R1, where she led Revenue Performance Solutions and Physician Advisory Services teams. She joined R1 following the acquisition of Cloudmed where she was Chief Operating Officer. Prior to Cloudmed, she served as Group Senior Vice President of Strategic Sourcing Partnerships and Programs for Vizient, a leader in healthcare services.",
      "Kristina began her career with GE, where she held several leadership positions in services and supply chain. She served as the General Manager of GE's Healthcare IT business across the Americas. Kristina graduated from Penn State University with a mechanical engineering degree and earned an M.B.A. from The Wharton School of Business.",
    ],
  },
  {
    name: "Eric Scollard",
    title: "Technology Sales Leader, Business Advisor & Investor",
    initials: "ES",
    photo: "/images/team/eric-scollard.webp",
    bio: [
      "Eric Scollard is a Technology Sales Leader, Business Advisor & Investor. Throughout his career, Eric has taken startups from pre-revenue to successful IPO and/or acquisition stages. He has delivered over a billion dollars in revenue, helped raise hundreds of millions in capital, and returned billions of dollars in shareholder value. He has scaled sales operations globally and hired hundreds of sales professionals while building teams to compete and win against some of the most dominant incumbents in the industry.",
      "His highlights include joining Isilon Systems before product availability, hiring the first sales teams, and growing revenue from $0 to ~$100M in less than 5 years. Along the way, Isilon was the most successful technology IPO of the year and eventually sold to EMC for $2.5B. Today, Isilon is the dominant scale-out file storage solution in the market.",
      "He was VP of Sales at ExtraHop which was eventually acquired for $1B. At Qumulo, Eric was a seed investor and VP of Sales where he grew quarterly bookings by more than 10X to ~$100M run rate in less than 4 years. During this time, the sales team expanded globally and helped set the stage for a funding round in 2020 that valued the company at well over $1B.",
      "After Qumulo, Eric helped launch the sales team at Carbon Robotics, an AI-powered AgTech disruptor. Earlier in his career, he held sales and leadership positions at EMC, IBM, Veritas Software, and Ocarina Networks.",
      "Eric is known as an excellent teacher and presenter and has been a guest lecturer at the University of Washington's Foster School of Business. He holds degrees in Economics and Speech Communications from Gonzaga University.",
    ],
  },
];

function AdvisorCard({
  name,
  title,
  initials,
  photo,
  bio,
  delay = 0,
}: {
  name: string;
  title: string;
  initials: string;
  photo?: string;
  bio: string[];
  delay?: number;
}) {
  return (
    <FadeIn delay={delay} className="h-full">
      <div className="group relative flex h-full flex-col rounded-2xl hairline bg-white p-8 md:p-10 card-lift">
        <div className="flex items-center gap-5">
          <AvatarBlock name={name} initials={initials} photo={photo} />
          <div>
            <h3 className="text-xl font-semibold text-[color:var(--ink)]">{name}</h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[color:var(--blue-link)]">
              {title}
            </p>
          </div>
        </div>
        <div className="mt-auto pt-7">
          <BioModal name={name} title={title} initials={initials} photo={photo} bio={bio} />
        </div>
      </div>
    </FadeIn>
  );
}

/* ---------------- Local: operating-record hero visual ---------------- */

const OPERATING_RECORD: { stage: string; title: string; detail: string; accent?: boolean }[] = [
  {
    stage: "Inside the vendor",
    title: "Ran the CX program at enterprise scale",
    detail: "Built customer experience for a global technology vendor as it moved to services.",
  },
  {
    stage: "Inside the platform",
    title: "Saw how the leaders do it",
    detail: "Led high-tech and telecom at a leading experience-management platform.",
  },
  {
    stage: "Inside your corner",
    title: "Became the team",
    detail: "VistaXM runs the same playbook for the channel, fully managed.",
    accent: true,
  },
];

function OperatingRecordCard() {
  return (
    <div className="glass relative overflow-hidden p-6 md:p-7">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--orange-pop)]"
      />

      <div className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#67a6ff]">
        The operating record
      </div>

      <div className="relative mt-5">
        {/* Connector */}
        <span
          aria-hidden
          className="absolute bottom-4 left-[9px] top-2 w-px bg-gradient-to-b from-[#2a5183] via-[#2a5183] to-[color:var(--orange-pop)]/60"
        />
        <div className="space-y-6">
          {OPERATING_RECORD.map((stop) => (
            <div key={stop.stage} className="relative flex gap-4">
              <span
                className={`relative z-10 mt-1 flex h-[19px] w-[19px] flex-none items-center justify-center rounded-full border ${
                  stop.accent
                    ? "border-[color:var(--orange-pop)] bg-[rgba(246,130,65,0.18)]"
                    : "border-[#2a5183] bg-[#0a3a6b]"
                }`}
                aria-hidden
              >
                <span
                  className={`h-[7px] w-[7px] rounded-full ${
                    stop.accent ? "bg-[color:var(--orange-pop)]" : "bg-[#67a6ff]"
                  }`}
                />
              </span>
              <div>
                <div
                  className={`text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${
                    stop.accent ? "text-[#ffd2b5]" : "text-[#7fa3cf]"
                  }`}
                >
                  {stop.stage}
                </div>
                <div className="mt-1 text-[0.95rem] font-semibold leading-snug text-white">
                  {stop.title}
                </div>
                <p className="mt-1 text-[0.82rem] leading-relaxed text-[#9fc0e8]">{stop.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-white/[0.08] pt-4 text-[0.82rem] text-[#bcd6f5]">
        The pattern was clear: the leaders tie every point of experience to dollars. Now the channel
        can too.
      </div>
    </div>
  );
}

function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built by operators who lived this problem."
        subtitle="We ran customer experience inside the companies you know. We built VistaXM because the mid-market and the channel could not get the same results without the same team. So we became the team."
        visual={<OperatingRecordCard />}
      />

      {/* The story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <SectionHead eyebrow="The story" title="From the inside of the companies you know." />
          <FadeIn delay={120}>
            <div className="relative rounded-2xl hairline bg-[color:var(--blue-tint)] p-8 md:p-10">
              <p className="relative text-lg leading-relaxed text-[color:var(--ink-soft)]">
                Erik built the customer experience program for HPE GreenLake as it shifted to cloud
                services, then led high-tech and telecom at a leading experience-management
                platform, with a front-row seat to how Apple, ServiceNow, and AWS turn experience
                into revenue. The pattern was clear: the leaders tie every point of experience to
                dollars, and almost no one else can. VistaXM brings that playbook, fully managed, to
                the channel.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Leadership */}
      <Section tint id="team">
        <SectionHead
          center
          eyebrow="Leadership"
          title="The team behind the category."
          intro="Revenue Channel Intelligence was built by people who have run customer experience and the channel at scale."
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:mt-14 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {LEADERS.map((leader, i) => (
            <LeaderProfileCard key={leader.name} {...leader} delay={i * 80} />
          ))}
        </div>
      </Section>

      {/* Advisors */}
      <Section>
        <SectionHead
          center
          eyebrow="Advisors"
          title="Guided by people who are passionate about the channel and revenue intelligence."
          intro="Backed by industry leaders in technology, strategy, and customer success."
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:mt-14 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {ADVISORS.map((advisor, i) => (
            <AdvisorCard key={advisor.name} {...advisor} delay={i * 80} />
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  );
}
