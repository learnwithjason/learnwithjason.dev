import { h } from 'preact';
import { TeacherPhoto } from './teacher-photo.js';

export function Footer() {
  return (
    <footer class="footer">
      <h2>About the Host</h2>
      <div class="host-bio">
        <div class="host-photo">
          <TeacherPhoto
            imageURL="https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_300,h_300,c_thumb,g_face,z_0.6/v1593462970/jason.af/jason-lengstorf-tokyo.jpg"
            alt="Jason Lengstorf"
          />
        </div>
        <div class="host-details">
          <p>
            <strong>Jason Lengstorf</strong> is a developer, a teacher, a
            lifelong learner, and a huge doofus. He works as a Principal
            Developer Experience Engineer at{' '}
            <a href="https://www.netlify.com/?utm_source=learnwithjason&utm_medium=lwj-jl&utm_campaign=devex">
              Netlify
            </a>{' '}
            and blogs at <a href="https://jason.af">jason.af</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
