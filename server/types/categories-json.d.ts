interface CategoriesJSON {
	year: number;
	categories: {
		slug: string;
		category: string;
		subcategories: {
			slug: string;
			title: string;
		};
	}[];
}
