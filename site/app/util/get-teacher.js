export function getTeacher(guestArray) {
  const [guest] = guestArray ?? [];
  const teacher = guest ?? { name: 'Jason Lengstorf' };
  const image =
    teacher?.guestImage?.asset.url ||
    'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto/lwj/teacher-placeholder.jpg';

  return {
    name: teacher.name,
    twitter: teacher.twitter,
    image,
  };
}
