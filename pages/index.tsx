import Head from 'next/head';
import Image from 'next/image';
import Editor from 'pages/editor';
import Models from 'pages/models';

export default function Home() {
  return (
    <div className="bg-blue-900 w-screen h-screen">
      <Editor />
    </div>
  );
}
