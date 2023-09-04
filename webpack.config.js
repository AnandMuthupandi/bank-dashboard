module.exports = {
    // ... other webpack configurations ...
  
    module: {
      rules: [
        // ... other rules ...
  
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/', // Output path for assets
          },
        },
      ],
    },
  };