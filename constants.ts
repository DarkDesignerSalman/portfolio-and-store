import { NewsItem, PortfolioItem, Product } from "./types";

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Dhaka Tech Summit 2024 Ends with High Hopes',
    summary: 'The biggest technology summit in Bangladesh concluded yesterday with major announcements from government and private sectors regarding AI integration.',
    image: 'https://picsum.photos/800/400?random=1',
    date: 'Today',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'New Metro Rail Line Construction Starts',
    summary: 'The new phase of the Metro Rail project aims to connect the northern suburbs to the business district by 2026.',
    image: 'https://picsum.photos/800/400?random=2',
    date: 'Today',
    category: 'National'
  },
  {
    id: '3',
    title: 'Cricket Team Announces Squad for World Cup',
    summary: 'The tigers are ready to roar as the final squad list was published this morning amid fan excitement.',
    image: 'https://picsum.photos/800/400?random=3',
    date: 'Yesterday',
    category: 'Sports'
  },
  {
    id: '4',
    title: 'Global Design Trends impacting Local Markets',
    summary: 'How minimalistic design choices are influencing local packaging industries in South Asia.',
    image: 'https://picsum.photos/800/400?random=4',
    date: '2 Days Ago',
    category: 'Lifestyle'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise Cancelling Headphones',
    price: 3500,
    originalPrice: 5000,
    image: 'https://picsum.photos/400/400?random=5',
    rating: 4.5,
    reviews: 120,
    category: 'Electronics',
    description: 'Experience pure sound with active noise cancellation technology. 30-hour battery life and ultra-comfortable ear cushions for long listening sessions.'
  },
  {
    id: '2',
    name: 'RGB Mechanical Gaming Keyboard',
    price: 4200,
    originalPrice: 4800,
    image: 'https://picsum.photos/400/400?random=6',
    rating: 4.8,
    reviews: 85,
    category: 'Electronics',
    description: 'High-performance mechanical switches with customizable RGB lighting. Durable aluminum frame and dedicated media controls for the ultimate gaming setup.'
  },
  {
    id: '3',
    name: 'Ergonomic Designer Chair',
    price: 12500,
    originalPrice: 15000,
    image: 'https://picsum.photos/400/400?random=7',
    rating: 4.9,
    reviews: 42,
    category: 'Lifestyle',
    description: 'Designed for comfort and style. Adjustable lumbar support, breathable mesh back, and premium materials make this chair perfect for your home office.'
  },
  {
    id: '4',
    name: 'Smart Fitness Watch Gen 5',
    price: 2800,
    image: 'https://picsum.photos/400/400?random=8',
    rating: 4.2,
    reviews: 200,
    category: 'Electronics',
    description: 'Track your health metrics, workouts, and sleep patterns. Water-resistant design with a vibrant AMOLED display and long-lasting battery.'
  },
  {
    id: '5',
    name: 'Minimalist Desk Lamp',
    price: 1500,
    image: 'https://picsum.photos/400/400?random=9',
    rating: 4.6,
    reviews: 30,
    category: 'Accessories',
    description: 'Sleek and modern LED desk lamp with adjustable brightness and color temperature. Eye-care technology reduces strain during late-night work.'
  }
];

export const MOCK_PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'Brand Identity: TechFlow',
    category: 'logo',
    image: 'https://picsum.photos/600/400?random=10',
    description: 'Modern minimalist logo for a SaaS company.'
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    category: 'poster',
    image: 'https://picsum.photos/600/800?random=11',
    description: 'Vibrant poster design for an open-air concert.'
  },
  {
    id: '3',
    title: 'E-commerce Redesign',
    category: 'website',
    image: 'https://picsum.photos/800/600?random=12',
    description: 'Complete UI/UX overhaul for a fashion retailer.'
  },
  {
    id: '4',
    title: 'Gaming Channel Art',
    category: 'banner',
    image: 'https://picsum.photos/800/300?random=13',
    description: 'YouTube banner for a popular gaming streamer.'
  },
  {
    id: '5',
    title: 'Review Video Thumbnail',
    category: 'thumbnail',
    image: 'https://picsum.photos/600/400?random=14',
    description: 'Click-optimized thumbnail for tech review.'
  },
  {
    id: '6',
    title: 'Corporate Landing Page',
    category: 'website',
    image: 'https://picsum.photos/800/600?random=15',
    description: 'Clean, professional landing page for a law firm.'
  }
];

export const SKILLS = [
  'HTML5', 'CSS3/Sass', 'Bootstrap', 'Tailwind CSS',
  'JavaScript', 'TypeScript', 'React.js', 'Next.js',
  'AngularJS', 'Git/GitHub', 'SQL'
];