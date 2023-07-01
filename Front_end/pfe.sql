-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 27 juin 2023 à 18:24
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pfe`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userID` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `email`, `userName`, `password`, `userID`, `role`, `created_at`, `updated_at`) VALUES
(1, 'oubellilfouad4@gmail.com', 'Admin', '1234', 1234, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `affectation`
--

CREATE TABLE `affectation` (
  `afecid` int(11) NOT NULL,
  `profid` int(11) DEFAULT NULL,
  `semestre` varchar(100) DEFAULT NULL,
  `section` int(11) DEFAULT NULL,
  `groupe` int(11) DEFAULT NULL,
  `depid` int(11) DEFAULT NULL,
  `module` int(11) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `tc` tinyint(1) DEFAULT NULL,
  `chef` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `availability`
--

CREATE TABLE `availability` (
  `avaid` int(11) NOT NULL,
  `profid` int(11) DEFAULT NULL,
  `day` int(11) DEFAULT NULL,
  `hour` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `chambre`
--

CREATE TABLE `chambre` (
  `chambreid` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `capacite` int(11) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `chefdep`
--

CREATE TABLE `chefdep` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userID` varchar(255) NOT NULL,
  `dateNaiss` date NOT NULL,
  `role` int(11) NOT NULL,
  `depID` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `dep`
--

CREATE TABLE `dep` (
  `depid` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `domainid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `domain`
--

CREATE TABLE `domain` (
  `domainid` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `edt`
--

CREATE TABLE `edt` (
  `edtid` int(11) NOT NULL,
  `profid` int(11) DEFAULT NULL,
  `semestre` varchar(100) DEFAULT NULL,
  `profname` varchar(100) DEFAULT NULL,
  `section` int(11) DEFAULT NULL,
  `groupe` int(11) DEFAULT NULL,
  `module` int(11) DEFAULT NULL,
  `day` int(11) DEFAULT NULL,
  `hour` int(11) DEFAULT NULL,
  `place` int(11) DEFAULT NULL,
  `affid` int(11) DEFAULT NULL,
  `depid` int(11) DEFAULT NULL,
  `gestid` int(11) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `tc` tinyint(1) DEFAULT NULL,
  `chef` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `enseignant`
--

CREATE TABLE `enseignant` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userID` int(11) NOT NULL,
  `dateNaiss` date NOT NULL,
  `depID` int(11) NOT NULL,
  `grad` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `cours` varchar(255) DEFAULT NULL,
  `choix` varchar(255) DEFAULT NULL,
  `disponibilité` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

CREATE TABLE `etudiant` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `userID` varchar(255) NOT NULL,
  `dateNaiss` date NOT NULL,
  `dep` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `specialite` int(11) NOT NULL,
  `section` int(11) NOT NULL,
  `group` int(11) NOT NULL,
  `pallier` int(11) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `filiere`
--

CREATE TABLE `filiere` (
  `fillid` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `depid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `formation_tranc_commun`
--

CREATE TABLE `formation_tranc_commun` (
  `ftcid` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `cycle` varchar(100) DEFAULT NULL,
  `dep1` int(11) DEFAULT NULL,
  `dep2` int(11) DEFAULT NULL,
  `dep3` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `gestdep`
--

CREATE TABLE `gestdep` (
  `id` int(11) NOT NULL,
  `depid` int(11) DEFAULT NULL,
  `gestid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `gestionnaire`
--

CREATE TABLE `gestionnaire` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userID` varchar(255) NOT NULL,
  `dateNaiss` date NOT NULL,
  `type` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

CREATE TABLE `groupe` (
  `grpid` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `speid` int(11) DEFAULT NULL,
  `secid` int(11) DEFAULT NULL,
  `depid` int(11) DEFAULT NULL,
  `palid` int(11) DEFAULT NULL,
  `capacite` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `groupe_tranc_commun`
--

CREATE TABLE `groupe_tranc_commun` (
  `grpid` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `speid` int(11) DEFAULT NULL,
  `secid` int(11) DEFAULT NULL,
  `capacite` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(3, '2023_03_19_005839_create_admin_table', 1),
(4, '2023_03_25_151438_create_chefdep_table', 1),
(5, '2023_03_25_200750_create_gestionnaire_table', 1),
(6, '2023_03_31_193335_create_enseignant_table', 1),
(7, '2023_04_30_013325_create_etudiant_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `module`
--

CREATE TABLE `module` (
  `modid` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `speid` int(11) DEFAULT NULL,
  `depid` int(11) DEFAULT NULL,
  `fillid` int(11) DEFAULT NULL,
  `vhg` int(11) DEFAULT NULL,
  `hcour` int(11) DEFAULT NULL,
  `htp` int(11) DEFAULT NULL,
  `htd` int(11) DEFAULT NULL,
  `abbr` varchar(100) DEFAULT NULL,
  `semestre` int(11) DEFAULT NULL,
  `palid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `module_tranc_commun`
--

CREATE TABLE `module_tranc_commun` (
  `modid` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `speid` int(11) DEFAULT NULL,
  `dep1` int(11) DEFAULT NULL,
  `dep2` int(11) DEFAULT NULL,
  `dep3` int(11) DEFAULT NULL,
  `vhg` int(11) DEFAULT NULL,
  `hcour` int(11) DEFAULT NULL,
  `htp` int(11) DEFAULT NULL,
  `htd` int(11) DEFAULT NULL,
  `abbr` varchar(100) DEFAULT NULL,
  `semestre` int(11) DEFAULT NULL,
  `palid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `palier`
--

CREATE TABLE `palier` (
  `palid` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `annee` int(11) DEFAULT NULL,
  `speid` int(11) DEFAULT NULL,
  `depid` int(11) DEFAULT NULL,
  `nbrsec` int(11) DEFAULT NULL,
  `nbrgrp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `palier_tranc_commun`
--

CREATE TABLE `palier_tranc_commun` (
  `palid` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `annee` int(11) DEFAULT NULL,
  `speid` int(11) DEFAULT NULL,
  `nbrsec` int(11) DEFAULT NULL,
  `nbrgrp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `section`
--

CREATE TABLE `section` (
  `secid` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `speid` int(11) DEFAULT NULL,
  `depid` int(11) DEFAULT NULL,
  `capacite` int(11) DEFAULT NULL,
  `palid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `section_tranc_commun`
--

CREATE TABLE `section_tranc_commun` (
  `secid` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `speid` int(11) DEFAULT NULL,
  `capacite` int(11) DEFAULT NULL,
  `palid` int(11) DEFAULT NULL,
  `dep1` int(11) DEFAULT NULL,
  `dep2` int(11) DEFAULT NULL,
  `dep3` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `specialite`
--

CREATE TABLE `specialite` (
  `speid` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `fillid` int(11) DEFAULT NULL,
  `depid` int(11) DEFAULT NULL,
  `cycle` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `veux`
--

CREATE TABLE `veux` (
  `veuxid` int(11) NOT NULL,
  `teacherid` int(11) DEFAULT NULL,
  `choix1` varchar(500) DEFAULT NULL,
  `choix2` varchar(500) DEFAULT NULL,
  `choix3` varchar(500) DEFAULT NULL,
  `choix4` varchar(500) DEFAULT NULL,
  `choix5` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_userid_unique` (`userID`);

--
-- Index pour la table `affectation`
--
ALTER TABLE `affectation`
  ADD PRIMARY KEY (`afecid`);

--
-- Index pour la table `availability`
--
ALTER TABLE `availability`
  ADD PRIMARY KEY (`avaid`);

--
-- Index pour la table `chambre`
--
ALTER TABLE `chambre`
  ADD PRIMARY KEY (`chambreid`);

--
-- Index pour la table `chefdep`
--
ALTER TABLE `chefdep`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `chefdep_email_unique` (`email`),
  ADD UNIQUE KEY `chefdep_userid_unique` (`userID`);

--
-- Index pour la table `dep`
--
ALTER TABLE `dep`
  ADD PRIMARY KEY (`depid`);

--
-- Index pour la table `domain`
--
ALTER TABLE `domain`
  ADD PRIMARY KEY (`domainid`);

--
-- Index pour la table `edt`
--
ALTER TABLE `edt`
  ADD PRIMARY KEY (`edtid`);

--
-- Index pour la table `enseignant`
--
ALTER TABLE `enseignant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `enseignant_email_unique` (`email`),
  ADD UNIQUE KEY `enseignant_userid_unique` (`userID`);

--
-- Index pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `filiere`
--
ALTER TABLE `filiere`
  ADD PRIMARY KEY (`fillid`);

--
-- Index pour la table `formation_tranc_commun`
--
ALTER TABLE `formation_tranc_commun`
  ADD PRIMARY KEY (`ftcid`);

--
-- Index pour la table `gestdep`
--
ALTER TABLE `gestdep`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `gestionnaire`
--
ALTER TABLE `gestionnaire`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gestionnaire_email_unique` (`email`),
  ADD UNIQUE KEY `gestionnaire_userid_unique` (`userID`);

--
-- Index pour la table `groupe`
--
ALTER TABLE `groupe`
  ADD PRIMARY KEY (`grpid`);

--
-- Index pour la table `groupe_tranc_commun`
--
ALTER TABLE `groupe_tranc_commun`
  ADD PRIMARY KEY (`grpid`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`modid`);

--
-- Index pour la table `module_tranc_commun`
--
ALTER TABLE `module_tranc_commun`
  ADD PRIMARY KEY (`modid`);

--
-- Index pour la table `palier`
--
ALTER TABLE `palier`
  ADD PRIMARY KEY (`palid`);

--
-- Index pour la table `palier_tranc_commun`
--
ALTER TABLE `palier_tranc_commun`
  ADD PRIMARY KEY (`palid`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`secid`);

--
-- Index pour la table `section_tranc_commun`
--
ALTER TABLE `section_tranc_commun`
  ADD PRIMARY KEY (`secid`);

--
-- Index pour la table `specialite`
--
ALTER TABLE `specialite`
  ADD PRIMARY KEY (`speid`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Index pour la table `veux`
--
ALTER TABLE `veux`
  ADD PRIMARY KEY (`veuxid`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `affectation`
--
ALTER TABLE `affectation`
  MODIFY `afecid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `availability`
--
ALTER TABLE `availability`
  MODIFY `avaid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `chambre`
--
ALTER TABLE `chambre`
  MODIFY `chambreid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `chefdep`
--
ALTER TABLE `chefdep`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `dep`
--
ALTER TABLE `dep`
  MODIFY `depid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `domain`
--
ALTER TABLE `domain`
  MODIFY `domainid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `edt`
--
ALTER TABLE `edt`
  MODIFY `edtid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `enseignant`
--
ALTER TABLE `enseignant`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `etudiant`
--
ALTER TABLE `etudiant`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `filiere`
--
ALTER TABLE `filiere`
  MODIFY `fillid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `formation_tranc_commun`
--
ALTER TABLE `formation_tranc_commun`
  MODIFY `ftcid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `gestdep`
--
ALTER TABLE `gestdep`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `gestionnaire`
--
ALTER TABLE `gestionnaire`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `groupe`
--
ALTER TABLE `groupe`
  MODIFY `grpid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `groupe_tranc_commun`
--
ALTER TABLE `groupe_tranc_commun`
  MODIFY `grpid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `module`
--
ALTER TABLE `module`
  MODIFY `modid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `module_tranc_commun`
--
ALTER TABLE `module_tranc_commun`
  MODIFY `modid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `palier`
--
ALTER TABLE `palier`
  MODIFY `palid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `palier_tranc_commun`
--
ALTER TABLE `palier_tranc_commun`
  MODIFY `palid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `section`
--
ALTER TABLE `section`
  MODIFY `secid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `section_tranc_commun`
--
ALTER TABLE `section_tranc_commun`
  MODIFY `secid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `specialite`
--
ALTER TABLE `specialite`
  MODIFY `speid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `veux`
--
ALTER TABLE `veux`
  MODIFY `veuxid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
