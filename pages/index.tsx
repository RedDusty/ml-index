import Head from 'next/head';
import Image from 'next/image';
import Editor from 'pages/editor';

export default function Home() {
  return (
    <div className="bg-blue-900 w-full h-full">
      <Editor />
    </div>
  );
}
