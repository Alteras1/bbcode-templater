import { getPastebin, getPastebinResult } from './(pastebin)/actions';
import { FormFieldGenerator } from '@/components/form-fields/form-field-generator';
import { TemplateProvider } from '@/components/template-provider';
import { TemplateInput } from '@/components/templater/template-input';
import { GenerateOutput } from '@/components/templater/generate-output';
import { TemplateDebug } from '@/components/templater/template-debug';

export default async function Home({ params: { pastebin } }: { params: { pastebin: string } }) {
  const pastebinurl = pastebin ? 'https://pastebin.com/' + pastebin : '';
  const pastebinObj = {
    url: pastebinurl,
    content: {} as getPastebinResult,
    error: '',
  };
  if (pastebin) {
    console.log('fetching pastebin: ', pastebin);
    const res = await getPastebin(`https://pastebin.com/${pastebin}`);
    console.log('res: ', res);
    if ('error' in res) {
      pastebinObj.error = res.error;
    } else {
      pastebinObj.content = res;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-start gap-4">
      <TemplateProvider>
        <TemplateInput pastebin={pastebinObj} />
        <label className="form-control relative w-full min-w-full flex-row flex-wrap">
          <TemplateDebug />
        </label>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Generated Form Fields
        </h2>
        <FormFieldGenerator />
        <GenerateOutput />
      </TemplateProvider>
    </main>
  );
}
