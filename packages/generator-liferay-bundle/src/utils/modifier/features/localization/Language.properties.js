import ProjectAnalyzer from '../../../ProjectAnalyzer';

/**
 * A class to help modifying the Language.properties file.
 */
export default class {
	/**
	 * @param {Generator} generator a Yeoman generator
	 */
	constructor(generator) {
		this._generator = generator;
		this._path = new ProjectAnalyzer(generator).localizationFilePath;
	}

	/**
	 * Add a bunch of properties at once
	 * @param {object} properties
	 */
	addProperties(properties) {
		Object.entries(properties).forEach(([name, value]) =>
			this.addProperty(name, value)
		);
	}

	/**
	 * @param {string} name
	 * @param {string} value
	 */
	addProperty(name, value) {
		const fs = this._generator.fs;

		let content = fs.read(this._path).toString();

		if (content.length > 0 && content.charAt(content.length - 1) !== '\n') {
			content += '\n';
		}

		content += `${name}=${value}\n`;

		fs.write(this._path, content);
	}
}