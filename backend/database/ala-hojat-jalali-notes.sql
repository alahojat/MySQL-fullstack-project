-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 25, 2024 at 05:05 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notes`
--

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `title` varchar(128) DEFAULT NULL,
  `noteText` mediumtext,
  `userID` varchar(128) DEFAULT NULL,
  `uuid` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `noteText`, `userID`, `uuid`) VALUES
(142, 'The Sock\'s Soliloquy: Finding Harmony in Uniqueness', '<p><span style=\"color: rgb(35, 111, 161);\">In the mundane chore of laundry lies a profound lesson on the nature of existence. As I stand before the washing machine, sorting through a mountain of socks, I am reminded of the interconnectedness of all things. Each sock, once separated from its pair, seems lost and incomplete. Yet, in their unity, they find purpose and fulfillment. Life, much like a sock, can feel mismatched and chaotic at times. We search endlessly for our missing half, hoping to find completeness in another. But perhaps true fulfillment lies not in finding our other sock, but in embracing our uniqueness and finding harmony within ourselves.</span></p>', '0bf09945-e374-47eb-b6de-f0f1cae33f00', '94e5e7d3-2206-465b-91ad-405d2257c4a0'),
(152, 'The Ultimate Guide to Procrastination', '<ul>\n<li>Step 1: Sit down with a cup of coffee.</li>\n<li>Step 2: Stare blankly at the screen.</li>\n<li>Step 3: Consider doing something productive.</li>\n<li>Step 4: Decide against it.</li>\n<li>Step 5: Congratulations! You\'ve mastered the art of doing absolutely nothing.</li>\n</ul>', '2d2ed8bd-bf53-4879-9169-62c6ea4b3129', '3859cb5b-2fbf-4728-b07d-451400cf9ed7'),
(153, 'The Procrastinator\'s Dilemma', '<p>Today, I find myself faced with the age-old dilemma of the procrastinator: to work or to procrastinate? It\'s a question as old as time itself, yet one that continues to confound even the most seasoned of procrastinators. As I sit at my desk, paralyzed by indecision, I can\'t help but marvel at the sheer magnitude of my procrastination prowess. Truly, I am a master of my craft.</p>', '2d2ed8bd-bf53-4879-9169-62c6ea4b3129', '7fd58e9a-d25c-4043-a11e-f7457421b4d1'),
(154, 'The Procrastinator\'s Paradox', '<p>Today, I find myself trapped in the paradoxical labyrinth of procrastination, where every action leads inevitably to inaction and every decision is met with indecision. As I flit from one task to the next, never fully committing to any one course of action, I can\'t help but marvel at the absurdity of it all. For in the world of the procrastinator, time is both friend and foe, offering the illusion of endless opportunity while quietly slipping away, leaving nothing but regret in its wake.</p>', '2d2ed8bd-bf53-4879-9169-62c6ea4b3129', 'bc5420b1-4d08-4c2f-99e3-5bc7f1f28b59'),
(155, 'The Procrastinator\'s Prayer', '<p>Dear universe, grant me the strength to tackle my to-do list with the ferocity of a thousand suns, the wisdom to prioritize my tasks with the precision of a seasoned strategist, and the courage to face each deadline with the stoicism of a warrior. But until then, please bless me with the divine gift of procrastination, that I may while away the hours in blissful ignorance, content to let tomorrow worry about itself while I enjoy the sweet embrace of procrastination. Amen.</p>', '4187cfc1-f7a8-46b5-b9ba-400aec0562c8', 'e19b05d2-fc1f-45c0-a443-cd3fe9a33848'),
(156, 'Remember', '<p>Note to Self: Remember, procrastination isn\'t just a hobby; it\'s a lifestyle choice. Embrace the art of doing nothing with gusto and flair. After all, why do today what you can put off until tomorrow... or the day after... or next week? Just kidding... maybe.</p>', '4187cfc1-f7a8-46b5-b9ba-400aec0562c8', 'a6de1060-fdfe-4a4f-8e84-e8e7ebc33652');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(128) DEFAULT NULL,
  `userName` varchar(128) DEFAULT NULL,
  `userEmail` varchar(128) DEFAULT NULL,
  `userPassword` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `userName`, `userEmail`, `userPassword`) VALUES
(50, '2d2ed8bd-bf53-4879-9169-62c6ea4b3129', 'Sam', 'sam@mail.com', 'U2FsdGVkX1+kxFGv2d1XY2Ot5WzX83rRLWl0+HAgQXQ='),
(52, '0bf09945-e374-47eb-b6de-f0f1cae33f00', 'sara', 'sara@mail.com', 'U2FsdGVkX1/SHOTjCGqmj7IfdR5WZsT5tG4XAZ+5IIE='),
(66, '4187cfc1-f7a8-46b5-b9ba-400aec0562c8', 'Alex', 'alex@mail.com', 'U2FsdGVkX18LFLa7oENm2k+puA07R1+8l83sFR6mvMI=');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
