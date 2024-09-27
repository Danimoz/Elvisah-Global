import prisma from "./prisma";

export async function getCategories(){
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProductsFromRandomCategories() {
  try {
    // Get all category IDs
    const categories = await prisma.category.findMany({
      select: { id: true },
    });

    // Get 3 random categories
    const randomCategories = categories.sort(() => Math.random() - Math.random()).slice(0, 3);

    // for each category, fetch a random product
    const productPromises = randomCategories.map(async (category) => {
      const productsInCategory = await prisma.product.findMany({
        where: { categoryId: category.id },
      })

      if (productsInCategory.length === 0) return null

      const randomProductIndex = Math.floor(Math.random() * productsInCategory.length)
      return productsInCategory[randomProductIndex]
    })

    const products = await Promise.all(productPromises)
    return products.filter((product): product is NonNullable<typeof product> => product !== null)
  } catch(err) {
    console.error('Error fetching products from random categories:', err)
    return []
  }
}

export async function getProductsByCategory(category: string) {
  try {
    const products = await prisma.product.findMany({
      where: { category: { name: category } },
    });
    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAllProducts(page=1, size=24) {
  try {
    const products = await prisma.product.findMany({
      take: size,
      skip: size * (page - 1),
    });

    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / size);
    const hasPrev = page > 1;
    const hasNext = page < totalPages;

    return {
      products,
      hasPrev,
      hasNext,
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}


export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    });
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getRelatedProducts(productId: number, categoryId: number) {
  try {
    const relatedProducts = await prisma.product.findMany({
      where: { 
        categoryId,
        id: { not: productId },
      },
      take: 3,
    });

    return relatedProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchOrders(email: string, page = 1, size = 10) {
  try {
    const orders = await prisma.order.findMany({
      where: { customerEmail: email },
      include: { OrderItem: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * size,
      take: size,
    });
    //Add Pagination
    const totalOrders = await prisma.order.count({
      where: { customerEmail: email }
    });

    const totalPages = Math.ceil(totalOrders / size);
    const hasPrev = page > 1;
    const hasNext = page < totalPages;

    return {
      orders,
      hasPrev,
      hasNext,
    };

  } catch (error) {
    console.log(error);
    return {
      orders : [],
      hasPrev: false,
      hasNext: false,
    };
  }
}

export async function fetchOrderById(orderId: number) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { OrderItem: { include: { product: true } } },
    });
    return order;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAllOrders(status: string, email: string, page=1, size=30) {
  try {
    const whereClause: any = {};

    if (status) {
      whereClause.status = status;
    }

    if (email) {
      whereClause.customerEmail = email;
    }

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: { OrderItem: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
      skip: size * (page - 1),
      take: size,
    });

    const totalOrders = await prisma.order.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(totalOrders / size);
    const hasPrev = page > 1;
    const hasNext = page < totalPages;

    return {
      orders,
      hasPrev,
      hasNext,
    }
  } catch (error) {
    console.log(error);
    return {
      orders: [],
      hasPrev: false,
      hasNext: false,
    }
  }
}
