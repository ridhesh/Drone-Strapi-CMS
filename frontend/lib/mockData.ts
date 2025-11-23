export const mockPosts = [
  {
    id: 1,
    attributes: {
      title: "Inside the Autonomy Flight Stack: How Modern UAVs Think",
      slug: "inside-the-autonomy-flight-stack",
      excerpt: "A deep dive into the decision-making pipeline that powers autonomous UAV missions — from perception to planning.",
      content: `
        <p>Autonomous UAV systems represent the pinnacle of modern aerospace engineering, combining sophisticated algorithms with robust hardware to execute complex missions with minimal human intervention.</p>
        
        <h2>Perception Systems</h2>
        <p>The foundation of any autonomous system lies in its ability to perceive and understand its environment. Modern UAVs employ a multi-sensor fusion approach:</p>
        
        <h3>Sensor Fusion Architecture</h3>
        <p>By combining data from LiDAR, RGB cameras, thermal imaging, and inertial measurement units, autonomous systems create a comprehensive 3D understanding of their operational environment.</p>
        
        <h2>Decision Making Pipeline</h2>
        <p>The autonomy stack processes perceptual data through several layers of decision-making algorithms, each responsible for different aspects of mission execution.</p>
      `,
      featuredImage: {
        data: {
          attributes: {
            url: "/placeholder-post.png",
            alternativeText: "Autonomous flight system diagram"
          }
        }
      },
      category: {
        data: {
          id: 1,
          attributes: {
            name: "Autonomy",
            slug: "autonomy"
          }
        }
      },
      author: {
        data: {
          id: 1,
          attributes: {
            name: "Aarav Sharma"
          }
        }
      },
      readTime: "12 min",
      publishedAt: "2024-01-15T10:00:00.000Z"
    }
  },
  {
    id: 2,
    attributes: {
      title: "Why Your Drone Battery Doesn't Last — And How To Fix It",
      slug: "battery-optimization-tips",
      excerpt: "Understanding discharge curves, C-rating, power draw, and thermal management can increase battery life by 40%.",
      content: `
        <p>Battery performance remains one of the most critical factors in UAV operational effectiveness. Understanding the underlying principles can dramatically improve mission success rates.</p>
        
        <h2>Understanding Discharge Curves</h2>
        <p>Lithium polymer batteries exhibit non-linear discharge characteristics that significantly impact performance throughout the discharge cycle.</p>
        
        <h3>Thermal Management Strategies</h3>
        <p>Proper thermal management can extend battery life by maintaining optimal operating temperatures and preventing premature degradation.</p>
        
        <h2>Power Optimization Techniques</h2>
        <p>Advanced power management algorithms can dynamically adjust system parameters to maximize efficiency without compromising mission objectives.</p>
      `,
      featuredImage: {
        data: {
          attributes: {
            url: "/placeholder-post.png",
            alternativeText: "Battery optimization techniques"
          }
        }
      },
      category: {
        data: {
          id: 2,
          attributes: {
            name: "Power Systems",
            slug: "power-systems"
          }
        }
      },
      author: {
        data: {
          id: 2,
          attributes: {
            name: "Kavya Reddy"
          }
        }
      },
      readTime: "10 min",
      publishedAt: "2024-01-10T14:00:00.000Z"
    }
  },
  {
    id: 3,
    attributes: {
      title: "Advanced Sensor Fusion for Precision Navigation",
      slug: "sensor-fusion-navigation",
      excerpt: "Exploring how multi-sensor data fusion enables centimeter-level accuracy in GPS-denied environments.",
      content: `
        <p>In challenging operational environments where GPS signals are unreliable or unavailable, advanced sensor fusion techniques become critical for maintaining navigation accuracy.</p>
        
        <h2>Multi-Sensor Integration</h2>
        <p>Combining inertial measurement units, visual odometry, and environmental sensors creates a robust navigation solution.</p>
        
        <h3>Kalman Filter Implementation</h3>
        <p>Advanced filtering algorithms continuously refine position estimates by weighting sensor inputs based on reliability and environmental conditions.</p>
      `,
      featuredImage: {
        data: {
          attributes: {
            url: "/placeholder-post.png",
            alternativeText: "Sensor fusion system architecture"
          }
        }
      },
      category: {
        data: {
          id: 3,
          attributes: {
            name: "Sensors",
            slug: "sensors"
          }
        }
      },
      author: {
        data: {
          id: 3,
          attributes: {
            name: "Rohan Mehta"
          }
        }
      },
      readTime: "8 min",
      publishedAt: "2024-01-08T09:30:00.000Z"
    }
  }
];

export const mockCategories = [
  {
    id: 1,
    attributes: {
      name: "Autonomy",
      slug: "autonomy",
      description: "Autonomous systems and AI technologies for UAV operations"
    }
  },
  {
    id: 2,
    attributes: {
      name: "Power Systems",
      slug: "power-systems",
      description: "Battery management and power optimization for extended missions"
    }
  },
  {
    id: 3,
    attributes: {
      name: "Sensors",
      slug: "sensors",
      description: "Sensor technologies and data fusion algorithms"
    }
  }
];

// Helper function to get mock data in Strapi format
export const getMockPosts = () => ({
  data: mockPosts,
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: mockPosts.length
    }
  }
});

export const getMockCategories = () => ({
  data: mockCategories,
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: mockCategories.length
    }
  }
});

export const getMockPostBySlug = (slug: string) => {
  const post = mockPosts.find(p => p.attributes.slug === slug);
  return post ? { data: [post] } : { data: [] };
};

export const getMockPostsByCategory = (categorySlug: string) => {
  const posts = mockPosts.filter(p => 
    p.attributes.category.data.attributes.slug === categorySlug
  );
  return { data: posts };
};