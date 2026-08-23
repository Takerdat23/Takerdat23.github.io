CREATE TABLE `page_views` (
	`day` text NOT NULL,
	`country_code` text NOT NULL,
	`route` text NOT NULL,
	`views` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`day`, `country_code`, `route`)
);
