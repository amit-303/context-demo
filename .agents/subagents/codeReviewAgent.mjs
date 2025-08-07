export const description = "Reviews all source files using rules from .cursor/rules/code_review.mdc";

export async function run({ context }) {
  const files = await context.getProjectFiles([".js", ".jsx"]); // optional: ".ts", ".tsx" if needed
  const reviewRules = await context.readProjectFile(".cursor/rules/code_review.mdc");

  if (!files?.length) return "No source files found to review.";
  if (!reviewRules) return "Could not read the code review rules from .cursor/rules/code_review.mdc.";

  const fileContents = await Promise.all(
    files.map(async (file) => {
      const content = await context.readProjectFile(file);
      return `### ${file}\n\`\`\`js\n${content}\n\`\`\``;
    })
  );

  return `You are a code reviewer. Use the following rules to guide your feedback:\n\n${reviewRules}\n\nNow review the code below and suggest improvements:\n\n${fileContents.join("\n\n")}`;
}

// Save the agent's response to a file after it runs
export async function postprocess({ context, response }) {
  const outputPath = "agents/outputs/code_review_feedback.mdc";
  await context.writeProjectFile(outputPath, response);
  return `Code review output saved to ${outputPath}`;
  }