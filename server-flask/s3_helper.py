import os
import boto3
# import librosa
import pandas as pd
from botocore.exceptions import ClientError


class S3Helper:

    def __init__(self):
        self.client_id='tests_id'
        self.bucket = 'benkart-raw-audio-bucket2'
        
    def upload_file(self, file_name: str, object_name=None):
        """Upload a file to an S3 bucket
        :param file_name: File to upload
        :param object_name: S3 object name. If not specified then file_name is used
        :return: True if file was uploaded, else False
        """

        # If S3 object_name was not specified, use file_name
        file_name = file_name + '.wav'
        if object_name is None:
            object_name = os.path.basename(file_name)

        # Upload the file
        s3_client = boto3.client('s3')
        try:
            response = s3_client.upload_file(file_name, self.bucket, object_name)
        except ClientError as e:
            logging.error(e)
            return False
        return True