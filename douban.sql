-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- 主机： localhost:3306
-- 生成日期： 2018-12-26 23:31:48
-- 服务器版本： 5.7.24
-- PHP 版本： 7.1.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `douban`
--

-- --------------------------------------------------------

--
-- 表的结构 `actor`
--

CREATE TABLE `actor` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '姓名',
  `gender` char(1) COLLATE utf8_bin DEFAULT NULL COMMENT '性别',
  `constellation` char(32) COLLATE utf8_bin DEFAULT NULL COMMENT '星座',
  `born_date` datetime DEFAULT NULL COMMENT '出生日期',
  `born_regoin` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '出生地',
  `career` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '职业',
  `alias` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '别名',
  `resume` text COLLATE utf8_bin COMMENT '简历',
  `thumb` int(11) DEFAULT NULL COMMENT '缩略图',
  `imgs` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '图集，多个',
  `update_time` datetime DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `film`
--

CREATE TABLE `film` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '名称',
  `thumb` int(10) DEFAULT NULL COMMENT '缩略图',
  `score` float DEFAULT NULL COMMENT '评分',
  `launch_date` datetime DEFAULT NULL COMMENT '上映日期',
  `type` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '类型',
  `duration` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '持续时间',
  `alias` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '别名',
  `region` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '地区',
  `language` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '语言',
  `actor_id` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '演员id，多个',
  `director_id` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '导演id',
  `description` text COLLATE utf8_bin COMMENT '描述',
  `update_time` datetime DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `url` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '远程路径',
  `local_url` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '本地路径',
  `update_time` datetime DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转储表的索引
--

--
-- 表的索引 `actor`
--
ALTER TABLE `actor`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `actor`
--
ALTER TABLE `actor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `film`
--
ALTER TABLE `film`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
