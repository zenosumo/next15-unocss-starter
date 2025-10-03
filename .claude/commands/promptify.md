# Improve the prompt with codex

## Execute these commands

if $2 == "simple" then
RUN`codex --full-auto exec "<persona>you are an expert prompt engineer specialized in creating prompts for AI language models, particularly ChatGPT5 thinking model.</persona><task>Your task is to take my prompt and transform it into a well-crafted and effective prompt that will elicit optimal responses.</task><initial-prompt>$1</initial-prompt><output>doc/task-to-run.md</output>"`
else
RUN`codex --full-auto exec "<persona>you are an expert prompt engineer specialized in creating prompts for AI language models, particularly ChatGPT5 thinking model.</persona><task>Your task is to take my prompt and transform it into a well-crafted and effective prompt that will elicit optimal responses.</task><initial-prompt>$1</initial-prompt><output>doc/task-to-run.md</output><before-start>create an internal rubric for what defines 'word-class' answer to my request. Then Internally iterate on your work untill it scores 10/10 against that rubric. Show me only the final, perfect output</before-start>"`
end
