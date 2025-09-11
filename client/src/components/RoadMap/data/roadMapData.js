// roadMapData.js
const backendRoadmapData = {
  name: "Backend Developer Roadmap",
  children: [
    {
      name: "Learn a Programming Language",
      children: [
        {
          name: "JavaScript (Node.js)",
          content: {
            desc: "Learn JavaScript fundamentals and backend with Node.js.",
            link: "https://nodejs.org/",
          },
        },
        {
          name: "Python (Django/Flask/FastAPI)",
          content: {
            desc: "Master Python basics and use frameworks like Django, Flask, or FastAPI.",
            link: "https://www.python.org/",
          },
        },
        {
          name: "Java (Spring Boot)",
          content: {
            desc: "Learn Java fundamentals and build enterprise apps with Spring Boot.",
            link: "https://spring.io/projects/spring-boot",
          },
        },
        {
          name: "Go / Rust",
          content: {
            desc: "Explore Go or Rust for high-performance backend systems.",
            link: "https://go.dev/",
          },
        },
      ],
    },
    {
      name: "Databases",
      children: [
        {
          name: "SQL (PostgreSQL, MySQL)",
          content: {
            desc: "Understand relational databases, schemas, and SQL queries.",
            link: "https://www.postgresql.org/",
          },
        },
        {
          name: "NoSQL (MongoDB, Redis)",
          content: {
            desc: "Learn non-relational databases for flexibility and caching.",
            link: "https://www.mongodb.com/",
          },
        },
      ],
    },
    {
      name: "Version Control (Git)",
      content: {
        desc: "Learn Git: branching, merging, pull requests, collaboration.",
        link: "https://git-scm.com/",
      },
    },
    {
      name: "APIs",
      children: [
        {
          name: "REST API",
          content: {
            desc: "Build RESTful APIs with proper status codes and endpoints.",
            link: "https://restfulapi.net/",
          },
        },
        {
          name: "GraphQL",
          content: {
            desc: "Learn GraphQL for flexible data querying.",
            link: "https://graphql.org/",
          },
        },
      ],
    },
    {
      name: "Authentication & Security",
      children: [
        {
          name: "JWT / OAuth",
          content: {
            desc: "Implement authentication with JWT and OAuth standards.",
            link: "https://jwt.io/",
          },
        },
        {
          name: "HTTPS, CORS, CSRF",
          content: {
            desc: "Understand secure communication and common web security mechanisms.",
            link: "https://owasp.org/",
          },
        },
        {
          name: "Password Hashing (bcrypt, argon2)",
          content: {
            desc: "Hash and store passwords securely using bcrypt or argon2.",
            link: "https://cheatsheetseries.owasp.org/",
          },
        },
      ],
    },
    {
      name: "Server & Deployment",
      children: [
        {
          name: "Linux Basics",
          content: {
            desc: "Learn Linux commands and server management.",
            link: "https://linuxjourney.com/",
          },
        },
        {
          name: "Docker & Containers",
          content: {
            desc: "Use Docker to containerize and deploy apps.",
            link: "https://www.docker.com/",
          },
        },
        {
          name: "CI/CD (GitHub Actions, Jenkins)",
          content: {
            desc: "Automate testing and deployments using CI/CD pipelines.",
            link: "https://docs.github.com/en/actions",
          },
        },
        {
          name: "Cloud (AWS, Azure, GCP)",
          content: {
            desc: "Deploy apps to cloud platforms like AWS, Azure, or GCP.",
            link: "https://aws.amazon.com/",
          },
        },
      ],
    },
    {
      name: "Advanced Topics",
      children: [
        {
          name: "Message Queues (RabbitMQ, Kafka)",
          content: {
            desc: "Learn event-driven architecture using queues like Kafka or RabbitMQ.",
            link: "https://kafka.apache.org/",
          },
        },
        {
          name: "Caching (Redis, Memcached)",
          content: {
            desc: "Improve performance with caching strategies.",
            link: "https://redis.io/",
          },
        },
        {
          name: "Scalability & Load Balancing",
          content: {
            desc: "Design systems that scale horizontally with load balancers.",
            link: "https://aws.amazon.com/elasticloadbalancing/",
          },
        },
      ],
    },
  ],
};

export default backendRoadmapData;
