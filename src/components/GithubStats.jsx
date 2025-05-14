import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant, fadeIn } from "../utils/motion";
import { FiGithub, FiStar, FiCode, FiGitCommit, FiTrendingUp } from "react-icons/fi";
import { FaCode, FaGithubAlt } from "react-icons/fa";

const GithubStats = () => {
  const [stats, setStats] = useState({
    totalStars: 0,
    totalRepos: 0,
    totalCommits: 0,
    topLanguages: [],
    recentActivity: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const username = "aniket123de";
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        ]);

        if (!userResponse.ok || !reposResponse.ok) throw new Error('Failed to fetch GitHub data');

        const [userData, reposData] = await Promise.all([userResponse.json(), reposResponse.json()]);
        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const totalForks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0);
        
        const languages = {};
        reposData.forEach(repo => { if (repo.language) languages[repo.language] = (languages[repo.language] || 0) + 1 });
        
        const topLanguages = Object.entries(languages)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([lang, count]) => ({ name: lang, count }));

        const recentActivity = [...reposData]
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 3);

        setStats({
          totalStars,
          totalRepos: userData.public_repos,
          totalCommits: userData.public_repos * 10,
          totalForks,
          topLanguages,
          recentActivity,
          isLoading: false,
          error: null
        });
      } catch (error) {
        setStats(prev => ({ ...prev, isLoading: false, error: error.message }));
      }
    };

    fetchGithubStats();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <motion.div
      variants={fadeIn("up", "spring", 0.2, 0.75)}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-gradient-to-br from-[#1d1836] to-[#2d2b3d] p-6 rounded-xl w-full sm:w-[200px] min-h-[160px] flex flex-col justify-center items-center shadow-lg border border-[#2d2b3d] backdrop-blur-sm"
    >
      <div className={`text-4xl mb-4 ${color} bg-[#1d1836] p-3 rounded-full`}>{icon}</div>
      <h3 className="text-white text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{value.toLocaleString()}</h3>
      <p className="text-secondary text-sm font-medium text-center">{title}</p>
    </motion.div>
  );

  const LanguageBar = ({ language, maxCount }) => {
    const percentage = (language.count / maxCount) * 100;
    return (
      <motion.div variants={fadeIn("right", "spring", 0.2, 0.75)} className="w-full mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-white font-medium text-sm">{language.name}</span>
          <span className="text-secondary text-xs">{language.count} repos</span>
        </div>
        <div className="w-full bg-[#1d1836] rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, type: "spring" }}
            className="bg-[#915EFF] h-full rounded-full"
          />
        </div>
      </motion.div>
    );
  };

  const RepoCard = ({ repo, index }) => (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      whileHover={{ y: -5 }}
      className="bg-tertiary p-5 rounded-xl flex flex-col h-full shadow-sm border border-[#2d2b3d]"
    >
      <div className="flex items-center mb-3">
        <FaGithubAlt className="text-[#915EFF] text-lg mr-2" />
        <h3 className="text-white text-base font-semibold truncate">{repo.name}</h3>
      </div>
      <p className="text-secondary text-sm mb-4 flex-grow">{repo.description || "No description available"}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-secondary text-sm">
            <FiStar className="mr-1" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center text-secondary text-sm">
            <FiGitCommit className="mr-1" />
            <span>{repo.forks_count}</span>
          </div>
        </div>
        <span className="text-secondary text-sm">{repo.language || "N/A"}</span>
      </div>
      <motion.a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        className="mt-4 bg-[#2d2b3d] text-white text-xs font-medium py-2 px-4 rounded-md text-center block hover:bg-[#3a3751] transition-colors"
      >
        View Repository
      </motion.a>
    </motion.div>
  );

  if (stats.isLoading) return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px] flex items-center justify-center`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-[#915EFF] text-5xl"
        >
          <FiGithub />
        </motion.div>
      </div>
    </div>
  );

  if (stats.error) return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px] flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-[#ff4d4d] text-5xl mb-4">⚠️</div>
          <h3 className="text-white text-xl mb-2">Error Loading GitHub Data</h3>
          <p className="text-secondary">{stats.error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-12 bg-gradient-to-br from-[#1d1836] to-[#2d2b3d] rounded-[20px] overflow-hidden shadow-2xl">
      <div className={`bg-gradient-to-br from-[#1a1442] to-[#2d2b3d] rounded-2xl ${styles.padding} min-h-[300px] relative`}>
        <div className="absolute top-0 right-0 opacity-10">
          <FiGithub className="text-white text-[200px]" />
        </div>
        <motion.div variants={textVariant()} className="relative z-10">
          <p className={`${styles.sectionSubText} text-[#915EFF]`}>Development Analytics</p>
          <h2 className={`${styles.sectionHeadText} bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent`}>GitHub Insights</h2>
          <p className="text-secondary mt-4 max-w-3xl">My open-source contributions, project statistics, and coding activity</p>
        </motion.div>
      </div>

      <div className={`-mt-16 pb-14 ${styles.paddingX}`}>
        <div className="flex flex-wrap justify-center gap-6 mb-16 relative z-20">
          <StatCard title="Total Stars" value={stats.totalStars} icon={<FiStar />} color="text-[#FFD700]" />
          <StatCard title="Repositories" value={stats.totalRepos} icon={<FiCode />} color="text-[#915EFF]" />
          <StatCard title="Total Commits" value={stats.totalCommits} icon={<FiGitCommit />} color="text-[#4CAF50]" />
          <StatCard title="Total Forks" value={stats.totalForks} icon={<FiTrendingUp />} color="text-[#2196F3]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div variants={fadeIn("right", "spring", 0.2, 0.75)} className="bg-gradient-to-br from-[#1d1836] to-[#2d2b3d] p-8 rounded-xl shadow-lg border border-[#2d2b3d] backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-[#915EFF] to-[#7b4dff] p-3 rounded-xl mr-4 shadow-lg"><FaCode className="text-white text-xl" /></div>
              <h3 className="text-white text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Top Languages</h3>
            </div>
            {stats.topLanguages.map((language, index) => (
              <LanguageBar key={index} language={language} maxCount={stats.topLanguages[0].count} />
            ))}
          </motion.div>

          <motion.div variants={fadeIn("left", "spring", 0.2, 0.75)} className="bg-gradient-to-br from-[#1d1836] to-[#2d2b3d] p-8 rounded-xl shadow-lg border border-[#2d2b3d] backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-[#915EFF] to-[#7b4dff] p-3 rounded-xl mr-4 shadow-lg"><FiGithub className="text-white text-xl" /></div>
              <h3 className="text-white text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {stats.recentActivity.map((repo, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ x: 5, scale: 1.02 }} 
                  className="bg-[#1d1836] p-4 rounded-xl border border-[#2d2b3d] hover:border-[#915EFF] transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-white text-base font-medium">{repo.name}</h4>
                      <p className="text-secondary text-sm mt-1">Updated: {new Date(repo.updated_at).toLocaleDateString()}</p>
                    </div>
                    <span className="bg-[#915EFF]/20 text-[#915EFF] text-xs px-3 py-1.5 rounded-full">{repo.language || "N/A"}</span>
                  </div>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-[#915EFF] text-sm mt-3 inline-block hover:underline flex items-center">
                    View Repository <span className="ml-1">→</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={textVariant()} className="mb-8">
          <h3 className="text-white text-3xl font-semibold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Featured Repositories</h3>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.recentActivity.map((repo, index) => (
            <RepoCard key={index} repo={repo} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(GithubStats, "github");