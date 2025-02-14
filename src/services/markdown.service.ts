import { OLLAMA_MARKDOWN_MODEL } from '../config';
import { MarkdownRequest, MarkdownResponse } from '../model';
import { logInfo, logSuccess, toSeconds } from '../utils';
import { axios, AxiosError, AxiosResponse } from '../utils';

/**
 * Generate markdown from text
 *
 * @param summaries list of summaries
 * @returns markdown formatted text
 */
async function convertTextToMarkdown(summaries: string[]): Promise<string> {
  const markdowns: string[] = [];

  for (let i = 0; i < summaries.length; i++) {
    const summary = summaries[i];
    const time = Date.now();

    logInfo(`Markdown ${i + 1} of ${summaries.length}`);

    try {
      const {
        data: { response },
      } = await axios.post<MarkdownRequest, AxiosResponse<MarkdownResponse>, MarkdownRequest>('/markdown', {
        model: OLLAMA_MARKDOWN_MODEL,
        summary,
      });

      markdowns.push(response.trim());
      markdowns.push('\n\n'); // add '\n\n\n' to separate summaries

      logSuccess(`Markdown ${i + 1} completed in ${toSeconds(Date.now() - time)}.`);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error('Markdown generation failed', { cause: error.toJSON() });
      }
      throw new Error('Markdown generation failed', { cause: error });
    }
  }

  // remove last '\n\n\n'
  if (summaries[summaries.length - 1] === '\n\n\n') {
    summaries.pop();
  }

  return markdowns.join('\n\n');
}

export { convertTextToMarkdown };
