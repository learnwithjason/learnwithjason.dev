export function getTeacher(guest) {
  const [teacher = { name: 'Jason Lengstorf' }] = guest ?? [];
  const image =
    teacher?.guestImage?.asset.url ||
    'https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto/lwj/teacher-placeholder.jpg';

  return {
    name: teacher.name,
    twitter: teacher.twitter,
    image,
  };
}
