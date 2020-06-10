module.exports = {
	outputDir: "docs",
	publicPath: process.env.NODE_ENV === "production" ? "/" : "/vue-roller",
	configureWebpack: {
		output: {
			libraryExport: "default",
		},
	},
	css: { extract: false },
};
