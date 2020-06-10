module.exports = {
	outputDir: "docs",
	publicPath: process.env.NODE_ENV === "lib" ? "/" : "/vue-roller",
	configureWebpack: {
		output: {
			libraryExport: "default",
		},
	},
};
