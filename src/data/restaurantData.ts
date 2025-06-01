
import { Category, Product } from '@/types/restaurant';

export const categories: Category[] = [
  { id: 'chicken', name: 'الدجاج', description: 'تشكيلة متنوعة من أطباق الدجاج الشهية' },
  { id: 'flatbread', name: 'المطبقات', description: 'مطبقات طازجة بحشوات مختلفة' },
  { id: 'meat', name: 'اللحوم', description: 'أطباق اللحوم الفاخرة' },
  { id: 'pasta', name: 'المكرونات', description: 'أطباق المكرونة بالنكهات المميزة' },
  { id: 'stews', name: 'الإيدامات', description: 'الإيدامات التقليدية الشهية' },
  { id: 'drinks', name: 'المشروبات', description: 'مشروبات طازجة ومنعشة' },
  { id: 'bakery', name: 'المخبوزات', description: 'مخبوزات طازجة يومياً' },
  { id: 'grilled', name: 'المحروقات', description: 'أطباق مشوية على الفحم' },
  { id: 'kunafa', name: 'الكنافة', description: 'كنافة طازجة بأنواع مختلفة' },
  { id: 'salads', name: 'السلطات', description: 'سلطات طازجة ومتنوعة' },
  { id: 'masoob', name: 'المعصوب', description: 'المعصوب التقليدي بأشكال مختلفة' }
];

export const products: Product[] = [
  // المطبقات
  { id: 'flatbread-1', name: 'مطبق تونة', price: 90, categoryId: 'flatbread' },
  { id: 'flatbread-2', name: 'مطبق خضار', price: 60, categoryId: 'flatbread' },
  { id: 'flatbread-3', name: 'مطبق لحم مفروم', price: 100, categoryId: 'flatbread' },
  { id: 'flatbread-4', name: 'مطبق جبنة شيدر', price: 80, categoryId: 'flatbread' },
  { id: 'flatbread-5', name: 'مطبق موز وقشطة', price: 80, categoryId: 'flatbread' },

  // الدجاج
  { id: 'chicken-1', name: 'مندي دجاج', price: 115, categoryId: 'chicken' },
  { id: 'chicken-2', name: 'مدفون دجاج', price: 125, categoryId: 'chicken' },
  { id: 'chicken-3', name: 'برياني دجاج', price: 210, categoryId: 'chicken' },
  { id: 'chicken-4', name: 'مضغوط دجاج', price: 400, categoryId: 'chicken' },
  { id: 'chicken-5', name: 'فحم دجاج', price: 125, categoryId: 'chicken' },

  // اللحوم
  { id: 'meat-1', name: 'مندي لحم', price: 400, categoryId: 'meat' },
  { id: 'meat-2', name: 'مدفون لحم', price: 400, categoryId: 'meat' },
  { id: 'meat-3', name: 'مضغوط لحم', price: 400, categoryId: 'meat' },

  // المكرونة
  { id: 'pasta-1', name: 'مكرونة بالخضار', price: 60, categoryId: 'pasta' },
  { id: 'pasta-2', name: 'مكرونة بالتونة', price: 90, categoryId: 'pasta' },
  { id: 'pasta-3', name: 'مكرونة بالدجاج', price: 90, categoryId: 'pasta' },

  // الإيدامات
  { id: 'stews-1', name: 'بامية', price: 60, categoryId: 'stews' },
  { id: 'stews-2', name: 'ملوخية', price: 60, categoryId: 'stews' },
  { id: 'stews-3', name: 'سلته', price: 100, categoryId: 'stews' },
  { id: 'stews-4', name: 'محسة', price: 190, categoryId: 'stews' },
  { id: 'stews-5', name: 'مشكل خضار', price: 60, categoryId: 'stews' },

  // المشروبات
  { id: 'drinks-1', name: 'ليمون', price: 30, categoryId: 'drinks' },
  { id: 'drinks-2', name: 'ليمون نعناع', price: 35, categoryId: 'drinks' },
  { id: 'drinks-3', name: 'غازية', price: 20, categoryId: 'drinks' },
  { id: 'drinks-4', name: 'شاي عدني', price: 30, categoryId: 'drinks' },
  { id: 'drinks-5', name: 'كرك', price: 30, categoryId: 'drinks' },
  { id: 'drinks-6', name: 'قهوة تركي', price: 30, categoryId: 'drinks' },
  { id: 'drinks-7', name: 'حليب بالزنجبيل', price: 25, categoryId: 'drinks' },
  { id: 'drinks-8', name: 'زنجبيل', price: 17, categoryId: 'drinks' },

  // المخبوزات
  { id: 'bakery-1', name: 'تميس', price: 35, categoryId: 'bakery' },
  { id: 'bakery-2', name: 'تميس بالجبن', price: 40, categoryId: 'bakery' },
  { id: 'bakery-3', name: 'رطب صغير', price: 35, categoryId: 'bakery' },
  { id: 'bakery-4', name: 'رطب كبير', price: 40, categoryId: 'bakery' },
  { id: 'bakery-5', name: 'خبز طاوة', price: 35, categoryId: 'bakery' },
  { id: 'bakery-6', name: 'ملوح صغير', price: 35, categoryId: 'bakery' },
  { id: 'bakery-7', name: 'ملوح كبير', price: 40, categoryId: 'bakery' },

  // المحروقات
  { id: 'grilled-1', name: 'تونة محروقة', price: 110, categoryId: 'grilled' },
  { id: 'grilled-2', name: 'لحسة', price: 90, categoryId: 'grilled' },
  { id: 'grilled-3', name: 'شكشوكة', price: 70, categoryId: 'grilled' },
  { id: 'grilled-4', name: 'فول محروق', price: 75, categoryId: 'grilled' },
  { id: 'grilled-5', name: 'جبنة محروقة', price: 110, categoryId: 'grilled' },
  { id: 'grilled-6', name: 'بيض محروق', price: 90, categoryId: 'grilled' },
  { id: 'grilled-7', name: 'عدس محروق', price: 90, categoryId: 'grilled' },
  { id: 'grilled-8', name: 'كبدة محروقة', price: 190, categoryId: 'grilled' },
  { id: 'grilled-9', name: 'سجق محروق', price: 110, categoryId: 'grilled' },
  { id: 'grilled-10', name: 'لحم محروق', price: 140, categoryId: 'grilled' },
  { id: 'grilled-11', name: 'دجاج محروق', price: 120, categoryId: 'grilled' },
  { id: 'grilled-12', name: 'خضار محروقة', price: 60, categoryId: 'grilled' },
  { id: 'grilled-13', name: 'طحينة محروقة', price: 70, categoryId: 'grilled' },
  { id: 'grilled-14', name: 'زيت محروق', price: 70, categoryId: 'grilled' },
  { id: 'grilled-15', name: 'جبنة وزيتون محروقة', price: 110, categoryId: 'grilled' },
  { id: 'grilled-16', name: 'مشكل محروق', price: 120, categoryId: 'grilled' },
  { id: 'grilled-17', name: 'رب محروق', price: 70, categoryId: 'grilled' },
  { id: 'grilled-18', name: 'سمن محروق', price: 110, categoryId: 'grilled' },
  { id: 'grilled-19', name: 'طماطم محروقة', price: 60, categoryId: 'grilled' },

  // الكنافة
  { id: 'kunafa-1', name: 'كنافة بالقشطة', price: 40, categoryId: 'kunafa' },
  { id: 'kunafa-2', name: 'كنافة شوكولاتة', price: 50, categoryId: 'kunafa' },
  { id: 'kunafa-3', name: 'كنافة ميكس', price: 60, categoryId: 'kunafa' },

  // المعصوب
  { id: 'masoob-1', name: 'معصوب كوكتيل', price: 85, categoryId: 'masoob' },
  { id: 'masoob-2', name: 'معصوب ملكي', price: 90, categoryId: 'masoob' },
  { id: 'masoob-3', name: 'معصوب قشطة وعسل', price: 57, categoryId: 'masoob' },
  { id: 'masoob-4', name: 'عريكة كوكتيل', price: 85, categoryId: 'masoob' },
  { id: 'masoob-5', name: 'عريكة ملكي', price: 90, categoryId: 'masoob' },
  { id: 'masoob-6', name: 'هتع موز', price: 65, categoryId: 'masoob' },
  { id: 'masoob-7', name: 'فتة بالتمر', price: 65, categoryId: 'masoob' },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
