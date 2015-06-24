-- Dumping structure for таблиця projects
CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `lft` int(10) unsigned NOT NULL,
  `rgt` int(10) unsigned NOT NULL,
  `level` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дані для експорту не вибрані


-- Dumping structure for таблиця reports
CREATE TABLE IF NOT EXISTS `reports` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `date_report` date DEFAULT NULL,
  `time_start` time DEFAULT NULL,
  `time_end` time DEFAULT NULL,
  `comment` text,
  `date_report2` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `FK_reports_projects` (`project_id`),
  CONSTRAINT `FK_reports_projects` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дані для експорту не вибрані



-- Dumping structure for таблиця users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL DEFAULT 'NO_F_NAME',
  `last_name` varchar(50) NOT NULL DEFAULT 'NO_L_NAME',
  `nickname` varchar(64) DEFAULT 'NO_N_NAME',
  `mail` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` tinyint(3) NOT NULL DEFAULT '0',
  `auth_key` varchar(255) DEFAULT NULL,
  `date_registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_last_visited` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `isReportTimeLimited` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дані для експорту не вибрані