import { Link } from 'remix';
import { TeacherPhoto } from './teacher-photo.jsx';

export function Footer() {
  return (
    <footer className="footer">
      <h2>About the Host</h2>
      <div className="host-bio">
        <div className="host-photo">
          <TeacherPhoto
            imageURL="https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_300,h_300,c_thumb,g_face,z_0.6/v1593462970/jason.af/jason-lengstorf-tokyo.jpg"
            alt="Jason Lengstorf"
            width={125}
            skipFetch
          />
        </div>
        <div className="host-details">
          <p>
            <strong>Jason Lengstorf</strong> is a developer, teacher, lifelong
            learner, and a huge doofus. He works as VP of Developer Experience
            at{' '}
            <a href="https://www.netlify.com/?utm_source=learnwithjason&utm_medium=lwj-jl&utm_campaign=devex">
              Netlify
            </a>{' '}
            and blogs at <a href="https://jason.af">jason.af</a>.
          </p>
        </div>
      </div>
      <nav className="footer-links">
        <a href="https://github.com/learnwithjason/learnwithjason.dev">
          Source Code
        </a>{' '}
        ·{' '}
        <Link prefetch="intent" to="/code-of-conduct">
          Code of Conduct
        </Link>
      </nav>
    </footer>
  );
}
