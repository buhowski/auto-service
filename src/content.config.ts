import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const hero = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/hero' }),
	schema: z.object({
		badge: z.string(),
		headline: z.string(),
		highlightedWord: z.string(),
		subtext: z.string(),
		primaryCta: z.object({
			text: z.string(),
			href: z.string(),
		}),
		secondaryCta: z.object({
			text: z.string(),
			href: z.string(),
		}),
		phone: z.object({
			text: z.string(),
			href: z.string(),
		}),
		quoteForm: z.object({
			title: z.string(),
			subtitle: z.string(),
			fields: z.array(
				z.object({
					name: z.string(),
					label: z.string(),
					type: z.string(),
					placeholder: z.string(),
					required: z.boolean(),
				}),
			),
			submitText: z.string(),
			note: z.string(),
			successMessage: z.string(),
		}),
		backgroundImage: z.string(),
		backgroundAlt: z.string(),
	}),
});

const services = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/services' }),
	schema: z.object({
		sectionTitle: z.object({
			eyebrow: z.string(),
			headline: z.string(),
		}),
		items: z.array(
			z.object({
				icon: z.string(),
				title: z.string(),
				description: z.string(),
			}),
		),
		cta: z.object({
			text: z.string(),
			href: z.string(),
		}),
	}),
});

const whyChoose = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/whyChoose' }),
	schema: z.object({
		sectionTitle: z.object({
			eyebrow: z.string(),
			headline: z.string(),
		}),
		lead: z.string(),
		items: z.array(
			z.object({
				icon: z.string(),
				title: z.string(),
				description: z.string(),
			}),
		),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}),
	}),
});

const steps = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/steps' }),
	schema: z.object({
		sectionTitle: z.object({
			eyebrow: z.string(),
			headline: z.string(),
		}),
		items: z.array(
			z.object({
				icon: z.string(),
				title: z.string(),
				description: z.string(),
			}),
		),
	}),
});

const testimonials = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/testimonials' }),
	schema: z.object({
		sectionTitle: z.object({
			eyebrow: z.string(),
			headline: z.string(),
		}),
		items: z.array(
			z.object({
				rating: z.number(),
				quote: z.string(),
				author: z.object({
					name: z.string(),
					role: z.string(),
					image: z.string(),
					imageAlt: z.string(),
				}),
			}),
		),
	}),
});

const brands = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/brands' }),
	schema: z.object({
		eyebrow: z.string(),
		items: z.array(z.string()),
	}),
});

const cta = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/cta' }),
	schema: z.object({
		eyebrow: z.string(),
		headline: z.string(),
		subtext: z.string(),
		primaryCta: z.object({
			text: z.string(),
			href: z.string(),
		}),
		secondaryCta: z.object({
			text: z.string(),
			href: z.string(),
		}),
	}),
});

const hours = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/hours' }),
	schema: z.object({
		sectionTitle: z.object({
			eyebrow: z.string(),
			headline: z.string(),
		}),
		lead: z.string(),
		hours: z.array(
			z.object({
				day: z.string(),
				time: z.string(),
				isClosed: z.boolean().optional(),
			}),
		),
		contact: z.array(
			z.object({
				icon: z.string(),
				label: z.string(),
				value: z.string(),
				href: z.string(),
			}),
		),
		map: z.object({
			address: z.string(),
			directionsUrl: z.string(),
		}),
	}),
});

const footer = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/footer' }),
	schema: z.object({
		brand: z.object({
			name: z.string(),
			highlightedPart: z.string(),
		}),
		about: z.string(),
		social: z.array(
			z.object({
				platform: z.string(),
				href: z.string(),
				icon: z.string(),
				ariaLabel: z.string(),
			}),
		),
		links: z.object({
			services: z.array(
				z.object({
					text: z.string(),
					href: z.string(),
				}),
			),
			company: z.array(
				z.object({
					text: z.string(),
					href: z.string(),
				}),
			),
			visit: z.array(
				z.object({
					icon: z.string(),
					value: z.string(),
					href: z.string().optional(),
				}),
			),
		}),
		copyright: z.string(),
		backToTop: z.string(),
	}),
});

export const collections = {
	hero,
	services,
	whyChoose,
	steps,
	testimonials,
	brands,
	cta,
	hours,
	footer,
};
