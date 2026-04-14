export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'michele',
    quote:
      'Eduard has great technical skills and an innate ability to explain complex topics clearly. He combines passion, empathy, and professionalism — making him an excellent teacher and collaborator.',
    author: 'Michele Gaggini',
    role: 'Senior Manager',
  },
  {
    id: 'davide-b',
    quote:
      'Extraordinary teaching quality and genuine passion for what he does. Eduard creates engaging courses that make complex React and TypeScript concepts accessible and practical.',
    author: 'Davide Bonardi',
    role: 'Frontend Developer',
  },
  {
    id: 'davide-l',
    quote:
      'Eduard made my career transition possible. His patience and depth of explanation turned me from a complete beginner into a confident developer. His courses are a goldmine.',
    author: 'Davide Laverga',
    role: 'Career Changer → Developer',
  },
  {
    id: 'nicolo',
    quote:
      'Eduard combines deep technical excellence with outstanding communication skills. His architectural thinking and ability to translate complex systems into clear solutions is rare. A true architect-in-the-making.',
    author: 'Nicolò Marziale',
    role: 'PM / Enterprise Architect',
  },
]
